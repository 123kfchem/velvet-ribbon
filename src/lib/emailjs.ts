import emailjs from "@emailjs/browser";

export type ContactEnquiry = {
  customer_name: string;
  customer_email: string;
  phone_number: string;
  enquiry_subject: string;
  message: string;
  submission_time: string;
};

const config = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "",
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "",
  customerTemplateId: import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID?.trim() ?? "",
  adminTemplateId: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID?.trim() ?? "",
};

export const isEmailJsConfigured = Object.values(config).every(Boolean);

async function sendTemplate(templateId: string, params: ContactEnquiry) {
  const response = await emailjs.send(config.serviceId, templateId, params, {
    publicKey: config.publicKey,
    limitRate: { id: templateId, throttle: 15_000 },
  });

  if (response.status !== 200) {
    throw new Error(`EmailJS returned status ${response.status}`);
  }
}

export function sendAdminNotification(enquiry: ContactEnquiry) {
  return sendTemplate(config.adminTemplateId, enquiry);
}

export function sendCustomerConfirmation(enquiry: ContactEnquiry) {
  return sendTemplate(config.customerTemplateId, enquiry);
}
