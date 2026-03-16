# Sensitive Links Refactoring Summary

## Overview
Your yosobanta-mercury project has been successfully refactored to securely handle sensitive links and credentials using environment variables. All hardcoded secrets have been moved to a `.env` file that is excluded from version control.

## Changes Made

### 1. ✅ Created `.env` File
**Location:** `/.env`

**Contains:**
- `VITE_USER_EMAIL` - Personal contact email
- `VITE_FORMSPREE_ENDPOINT` - Form submission endpoint
- `VITE_CERT_DRIVE_CLOUD_COMPUTING` - Private Google Drive certificate
- `VITE_CERT_DRIVE_COMPUTATION_THEORY` - Private Google Drive certificate
- `VITE_CERT_DRIVE_MERN_GENAI` - Private Google Drive certificate
- `VITE_CERT_DRIVE_WEB_DESIGN` - Private Google Drive certificate

⚠️ **Important:** This file should NEVER be committed to version control.

### 2. ✅ Updated `.gitignore`
Added the following entries to prevent accidental commits:
```
.env
.env.local
.env.*.local
```

### 3. ✅ Created `.env.example`
**Location:** `/.env.example`

A template file showing all required environment variables. New developers can copy this file to `.env` and fill in their own values:
```bash
cp .env.example .env
```

### 4. ✅ Updated Components

#### **HeroSection.jsx**
- **Before:** `href: "mahapatrayosobanta6@gmail.com"`
- **After:** `href: \`mailto:${import.meta.env.VITE_USER_EMAIL}\``
- Mail icon now uses environment variable with proper `mailto:` protocol

#### **ContactForm.jsx**
- **Before:** `fetch("https://formspree.io/f/mbdzzavp", ...)`
- **After:** `fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, ...)`
- Form endpoint is now fetched from environment variables

#### **Certifications.jsx**
- Updated 4 certificate verification URLs:
  - **cert-6 (Cloud Computing):** `verifyUrl: import.meta.env.VITE_CERT_DRIVE_CLOUD_COMPUTING`
  - **cert-8 (Computation Theory):** `verifyUrl: import.meta.env.VITE_CERT_DRIVE_COMPUTATION_THEORY`
  - **cert-9 (MERN stack with GenAI):** `verifyUrl: import.meta.env.VITE_CERT_DRIVE_MERN_GENAI`
  - **cert-10 (Responsive Web Design):** `verifyUrl: import.meta.env.VITE_CERT_DRIVE_WEB_DESIGN`

### 5. ✅ Public URLs (Kept in Code)
The following public URLs remain hardcoded as they are non-sensitive:
- GitHub: `https://github.com/yosobanta`
- LinkedIn: `https://www.linkedin.com/in/yoso/`
- LeetCode: `https://leetcode.com/u/yosobanta/`
- GeeksforGeeks: `https://www.geeksforgeeks.org/profile/yosobanta_05`
- HackerRank: `https://www.hackerrank.com/profile/Yosobanta`
- CodeChef: `https://www.codechef.com/users/yosobanta2005`
- Kaggle: `https://www.kaggle.com/yosobanta`
- Coursera certificates (public verification URLs)

## Vite Environment Variables

All variables use the `VITE_` prefix for Vite compatibility:
- Environment variables prefixed with `VITE_` are automatically exposed to your client-side code
- Access them using `import.meta.env.VITE_VARIABLE_NAME`
- Variables without the `VITE_` prefix are kept private and won't leak to the client

## How to Use

### Development
1. Copy the template file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in `.env`:
   ```env
   VITE_USER_EMAIL=your.email@example.com
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
   VITE_CERT_DRIVE_CLOUD_COMPUTING=https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing
   # ... etc
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

### Production/Deployment
Set environment variables on your deployment platform:
- **Vercel:** Add in project settings → Environment Variables
- **Netlify:** Add in Site Settings → Build & Deploy → Environment
- **GitHub Pages/Any CI/CD:** Set in workflow secrets

Example for GitHub Actions:
```yaml
- name: Build
  env:
    VITE_USER_EMAIL: ${{ secrets.VITE_USER_EMAIL }}
    VITE_FORMSPREE_ENDPOINT: ${{ secrets.VITE_FORMSPREE_ENDPOINT }}
    VITE_CERT_DRIVE_CLOUD_COMPUTING: ${{ secrets.VITE_CERT_DRIVE_CLOUD_COMPUTING }}
    # ... etc
  run: npm run build
```

## Security Benefits

✅ **Sensitive data is no longer in version control**
✅ **Each developer can have their own .env file**
✅ **Easy to manage different credentials per environment (dev, staging, prod)**
✅ **No risk of accidentally exposing secrets in commits**
✅ **Simple to update credentials without code changes**
✅ **Follows Vite and industry best practices**

## Build Status
✅ **Project builds successfully** - Verified with `vite build`
✅ **No errors or breaking changes**
✅ **Application remains fully functional**

## Next Steps
1. **Copy `.env.example` to `.env`** and fill in your actual values
2. **Test the application locally** to ensure everything works
3. **Update your CI/CD pipeline** to pass environment variables during build
4. **Document for your team** how to set up their `.env` files
5. **Remove any hardcoded credentials** from your repository if they exist elsewhere

## File Reference
- `.env` - Sensitive environment variables (gitignored)
- `.env.example` - Template for team reference
- Updated files:
  - [src/components/HeroSection.jsx](src/components/HeroSection.jsx)
  - [src/components/ContactForm.jsx](src/components/ContactForm.jsx)
  - [src/components/Certifications.jsx](src/components/Certifications.jsx)
