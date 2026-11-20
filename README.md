# Velvet Ribbon

A responsive gifting-atelier landing page built with React, TypeScript, Vite, and Tailwind CSS. Photography, fonts, and brand icons are served locally.

## Run

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then serve the `dist` directory. `npm run preview` previews that build locally.

## Maintenance mode

Set `VITE_MAINTENANCE_MODE=true` in `.env` to show the maintenance page, or set it to `false` to show the regular site. Restart the dev server after changing `.env`; for deployment, set the same variable in your hosting provider's build environment and rebuild. `.env.example` shows the expected setting.

Vite embeds `VITE_` variables in the client-side JavaScript at build time, so this setting is public configuration, not a secret or security control. Never put credentials or other secrets in a `VITE_` variable. This is a static React site, so the maintenance screen is served with the host's normal HTTP status; configure a host-level maintenance response if you need visitors to receive HTTP 503.

## Contact enquiries and EmailJS

The Contact section sends the business notification first, then the customer confirmation, using the official `@emailjs/browser` SDK. Copy `.env.example` to `.env` and set:

| Variable | EmailJS dashboard value |
| --- | --- |
| `VITE_EMAILJS_PUBLIC_KEY` | Account public key |
| `VITE_EMAILJS_SERVICE_ID` | Email service ID |
| `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID` | Customer confirmation template ID |
| `VITE_EMAILJS_ADMIN_TEMPLATE_ID` | Business notification template ID |

These are frontend build settings. The EmailJS public key and all `VITE_` values are visible in the built site; do not place a private key or other secret in them. In EmailJS, restrict allowed origins to your production website and local development origin, and set appropriate sending limits.

Create two EmailJS templates using the HTML in `email-templates/`. Set the customer template's **To Email** to `{{customer_email}}` and its subject to `We've Received Your Message – Velvet Ribbon`. Set the business template's **To Email** to the business inbox, its subject to `New Customer Enquiry – Velvet Ribbon`, and **Reply-To** to `{{customer_email}}`. Both templates use `customer_name`, `customer_email`, `phone_number`, `enquiry_subject`, `message`, and `submission_time`. Paste each corresponding HTML file into the template's content.

The WhatsApp and social links use the real URLs and number in `public/social-links.json`. The WhatsApp action pre-fills the customer's current form details but does not send anything until the customer confirms in WhatsApp. If the business notification succeeds but customer confirmation fails, the form locks the enquiry details and retries only the customer email to avoid resending the business notification. A page refresh loses this in-progress retry state; durable idempotency across devices or reloads requires a backend.

## Connect the official accounts

Edit `public/social-links.json`. The three requested placeholders are preserved exactly until the brand supplies its details.

| Key | Required value |
| --- | --- |
| `instagram` | The official, full HTTPS Instagram profile URL |
| `tiktok` | The official, full HTTPS TikTok profile URL, including the @ handle |
| `whatsapp` | The official customer-service telephone number, including its country code |

The configured WhatsApp number also appears in the footer's contact details. An optional `contactEmail` key can be added to the same file when an official enquiry email address is available. No email address or phone number is assumed.

The page reads this file at runtime. On a deployed site, updating `social-links.json` updates the navigation, social section, collection enquiries, and footer without rebuilding the application. Refresh the page to load changes.

Configured links open in a new tab with `noopener noreferrer`. WhatsApp uses a recipient-specific `wa.me` link; collection enquiries also include an editable, contextual message. Nothing is sent automatically.

Missing, placeholder, or invalid values open an informative, accessible dialog instead of a broken link or guessed account. Only HTTPS profile URLs on the correct platform and international-format phone numbers are accepted. The site does not claim to verify account ownership: only enter details supplied by Velvet Ribbon.

## Structure

- `src/App.tsx`: page sections, navigation, and collection detail views
- `src/components/SocialLink.tsx`: shared, configuration-driven social interactions
- `src/lib/social.ts`: platform URL and phone-number handling
- `src/components/Dialog.tsx`: keyboard-accessible native dialogs
- `src/index.css`: responsive typography, styling, and reduced-motion support
- `public/images/`: custom gifting photography