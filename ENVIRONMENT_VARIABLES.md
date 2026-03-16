# Environment Variables Guide

## Quick Setup

### For Local Development
```bash
# Copy the template
cp .env.example .env

# Edit .env with your values
# Use your editor: code .env, vim .env, etc.
```

## Environment Variables in This Project

### User Contact Information
- **`VITE_USER_EMAIL`** - Your personal email address
  - Used in: HeroSection (mail icon link)
  - Format: `your.email@example.com`

### Form Endpoints
- **`VITE_FORMSPREE_ENDPOINT`** - Formspree form submission URL
  - Used in: ContactForm, PersonalHub
  - Format: `https://formspree.io/f/YOUR_FORM_ID`
  - Get from: https://formspree.io (create a form and copy the API endpoint)

### Certificate Links (Google Drive)
These are private document links that should not be exposed:
- **`VITE_CERT_DRIVE_CLOUD_COMPUTING`** - Cloud Computing certificate
- **`VITE_CERT_DRIVE_COMPUTATION_THEORY`** - Computation Theory certificate
- **`VITE_CERT_DRIVE_MERN_GENAI`** - MERN stack with GenAI certificate
- **`VITE_CERT_DRIVE_WEB_DESIGN`** - Responsive Web Design certificate

Format: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

## Accessing Variables in Code

```javascript
// In any React component or JavaScript file
const email = import.meta.env.VITE_USER_EMAIL;
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

// Working with optional variables
const certUrl = import.meta.env.VITE_CERT_DRIVE_CLOUD_COMPUTING || '#';

// In templates
<a href={`mailto:${import.meta.env.VITE_USER_EMAIL}`}>Email me</a>
```

## Important Rules

⚠️ **DO:**
- ✅ Add environment variables for sensitive data
- ✅ Prefix with `VITE_` for client-side access
- ✅ Add to `.env` for local development
- ✅ Add to `.env.example` as a template
- ✅ Set in CI/CD pipeline for production

❌ **DO NOT:**
- ❌ Commit `.env` file (it's in .gitignore)
- ❌ Hardcode secrets in the code
- ❌ Share `.env` file publicly
- ❌ Use variables without `VITE_` prefix for client secrets
- ❌ Store database credentials in client-side variables

## Deployment Instructions

### Vercel
1. Go to Project Settings → Environment Variables
2. Add each `VITE_*` variable
3. Redeploy

### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add environment variables
3. Redeploy

### GitHub Pages (with Actions)
1. Go to Settings → Secrets and Variables → Actions
2. Add each variable with `VITE_` prefix
3. Reference in workflow:
```yaml
- name: Build
  env:
    VITE_USER_EMAIL: ${{ secrets.VITE_USER_EMAIL }}
    # ... other vars
  run: npm run build
```

### Generic Hosting (Render, Railway, etc.)
Follow their documentation to set environment variables, then trigger redeploy.

## Troubleshooting

### Variables showing as `undefined`
- Make sure variable name starts with `VITE_`
- Restart dev server after adding new variable
- Check `.env` file is in root directory

### Build fails with missing variables
- Ensure all required `VITE_*` variables are set
- Check `.env` file exists and is readable
- Verify variable names match exactly

### Variable changes not appearing
- Restart development server (`npm run dev`)
- Clear browser cache
- Check spelling in component code

## Additional Resources
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Formspree Docs](https://formspree.io/docs/)
- [Google Drive Sharing Guide](https://support.google.com/drive/answer/2881579)
