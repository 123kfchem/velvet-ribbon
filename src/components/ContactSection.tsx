import { useRef, useState, type FormEvent } from "react";
import { Arrow, BrandIcon } from "./Icons";
import { SocialLink } from "./SocialLink";
import {
  isEmailJsConfigured,
  sendAdminNotification,
  sendCustomerConfirmation,
  type ContactEnquiry,
} from "../lib/emailjs";

const subjects = [
  "Gift Orders",
  "Custom Gifts",
  "Corporate Gifting",
  "Event Gifting",
  "General Enquiries",
] as const;

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FieldName = keyof ContactValues;
type FieldErrors = Partial<Record<FieldName, string>>;

const emptyValues: ContactValues = { name: "", email: "", phone: "", subject: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[\d\s().-]{7,25}$/;

function makeEnquiry(values: ContactValues): ContactEnquiry {
  return {
    customer_name: values.name.trim(),
    customer_email: values.email.trim(),
    phone_number: values.phone.trim(),
    enquiry_subject: values.subject,
    message: values.message.trim(),
    submission_time: `${new Intl.DateTimeFormat("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Nairobi",
    }).format(new Date())} EAT`,
  };
}

export default function ContactSection() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [businessEmailSent, setBusinessEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const submissionLock = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fieldsDisabled = isSending || businessEmailSent;
  const whatsappMessage = [
    "Hello Velvet Ribbon, I would like to enquire about gifting.",
    values.name.trim() && `Name: ${values.name.trim()}`,
    values.email.trim() && `Email: ${values.email.trim()}`,
    values.phone.trim() && `Phone: ${values.phone.trim()}`,
    values.subject && `Subject: ${values.subject}`,
    values.message.trim() && `Message: ${values.message.trim()}`,
  ].filter(Boolean).join("\n");

  function updateField(field: FieldName, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
    setFormError("");
    setSuccess("");
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!emailPattern.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Please enter your phone or WhatsApp number.";
    else if (!phonePattern.test(values.phone.trim())) next.phone = "Enter a valid phone number, using 7–25 digits and common phone punctuation.";
    if (!subjects.includes(values.subject as (typeof subjects)[number])) next.subject = "Please select an enquiry subject.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    return next;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current || isSending) return;
    setFormError("");
    setSuccess("");

    if (honeypot.trim()) {
      setFormError("We couldn’t submit this enquiry. Please try again.");
      return;
    }

    if (!isEmailJsConfigured) {
      setFormError("Our email form is not configured yet. Please contact us on WhatsApp instead.");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    const enquiry = makeEnquiry(values);
    let adminNotificationConfirmed = businessEmailSent;
    submissionLock.current = true;
    setIsSending(true);

    try {
      if (!adminNotificationConfirmed) {
        await sendAdminNotification(enquiry);
        adminNotificationConfirmed = true;
        setBusinessEmailSent(true);
      }

      await sendCustomerConfirmation(enquiry);
      setSuccess("Your enquiry was submitted. EmailJS confirmed that both emails were accepted for sending.");
      setValues(emptyValues);
      setErrors({});
      setBusinessEmailSent(false);
      setHoneypot("");
      formRef.current?.reset();
    } catch {
      setFormError(adminNotificationConfirmed
        ? "Your enquiry reached our team, but we couldn’t send the confirmation email. Retry to send the confirmation without resending the business notification."
        : "We couldn’t submit your enquiry. No successful email was confirmed; please try again.");
    } finally {
      submissionLock.current = false;
      setIsSending(false);
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="page-width">
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow"><span className="fine-rule" />Get in Touch</p>
            <h2 id="contact-title">Let's Make Every Gift <em>Special.</em></h2>
            <p className="contact-intro">Have a question or looking for something special? We'd love to hear from you. Send us a message and let us help you create a memorable gifting experience.</p>
            <div className="contact-direct">
              <h3>Prefer a quick conversation?</h3>
              <p>Reach us directly on WhatsApp, or follow along for more gifting inspiration.</p>
              <SocialLink platform="whatsapp" className="button button-green contact-whatsapp" message={whatsappMessage} label="Start a WhatsApp conversation with Velvet Ribbon">
                <BrandIcon platform="whatsapp" />Chat with us on WhatsApp<Arrow diagonal />
              </SocialLink>
              <div className="contact-socials" aria-label="Velvet Ribbon social media">
                <SocialLink platform="instagram" className="contact-social-link" label="Velvet Ribbon on Instagram">
                  <BrandIcon platform="instagram" /><span>Instagram</span><Arrow diagonal />
                </SocialLink>
                <SocialLink platform="tiktok" className="contact-social-link" label="Velvet Ribbon on TikTok">
                  <BrandIcon platform="tiktok" /><span>TikTok</span><Arrow diagonal />
                </SocialLink>
              </div>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={submit} noValidate aria-busy={isSending}>
            <div className="contact-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span></label>
                <input id="contact-name" name="name" autoComplete="name" maxLength={120} required value={values.name} disabled={fieldsDisabled} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} onChange={event => updateField("name", event.target.value)} />
                {errors.name && <span id="contact-name-error" className="contact-field-error">{errors.name}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label>
                <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required value={values.email} disabled={fieldsDisabled} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} onChange={event => updateField("email", event.target.value)} />
                {errors.email && <span id="contact-email-error" className="contact-field-error">{errors.email}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">Phone Number / WhatsApp Number <span aria-hidden="true">*</span></label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" minLength={7} maxLength={25} required value={values.phone} disabled={fieldsDisabled} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} onChange={event => updateField("phone", event.target.value)} />
                {errors.phone && <span id="contact-phone-error" className="contact-field-error">{errors.phone}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
                <select id="contact-subject" name="subject" required value={values.subject} disabled={fieldsDisabled} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} onChange={event => updateField("subject", event.target.value)}>
                  <option value="">Select an enquiry subject</option>
                  {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
                {errors.subject && <span id="contact-subject-error" className="contact-field-error">{errors.subject}</span>}
              </div>
              <div className="contact-field contact-field-message">
                <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
                <textarea id="contact-message" name="message" rows={5} maxLength={5000} required value={values.message} disabled={fieldsDisabled} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} onChange={event => updateField("message", event.target.value)} />
                {errors.message && <span id="contact-message-error" className="contact-field-error">{errors.message}</span>}
              </div>
            </div>

            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={event => setHoneypot(event.target.value)} />
            </div>

            {!isEmailJsConfigured && (
              <p className="contact-setup-note">The email form is unavailable until EmailJS is configured. You can still reach us on WhatsApp.</p>
            )}
            {(formError || success) && (
              <p className={`contact-status ${formError ? "is-error" : "is-success"}`} role={formError ? "alert" : "status"} aria-live={formError ? "assertive" : "polite"}>
                {formError || success}
              </p>
            )}
            <div className="contact-form-actions">
              <button type="submit" className="button button-green contact-submit" disabled={isSending || (!isEmailJsConfigured && !businessEmailSent)}>
                {isSending ? "Sending…" : businessEmailSent ? "Retry Confirmation Email" : "Send Message"}<Arrow />
              </button> 
              <SocialLink platform="whatsapp" className="contact-whatsapp-text" message={whatsappMessage} label="Prepare this enquiry to send via WhatsApp">
                <BrandIcon platform="whatsapp" />Send via WhatsApp
              </SocialLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
