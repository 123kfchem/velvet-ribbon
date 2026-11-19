# Velvet Ribbon

A responsive gifting-atelier landing page built with React, TypeScript, Vite, and Tailwind CSS. Photography, fonts, and brand icons are served locally.

## Run

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then serve the `dist` directory. `npm run preview` previews that build locally.

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