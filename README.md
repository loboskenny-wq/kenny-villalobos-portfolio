# Kenny Villalobos — Netlify starter

## Deploy
1. Sign in to Netlify and choose **Add new site → Deploy manually**.
2. Drag the contents of this folder (or connect this folder through a Git repository). For a production deployment with Functions, use a Git-connected deploy or Netlify CLI; simple drag-and-drop does not reliably bundle serverless Functions.
3. In Netlify: **Site configuration → Environment variables**, add:
   - `BROADCAST_PASSWORD` — choose a strong, unique password to share with approved viewers.
   - `SESSION_SECRET` — a long random secret (at least 32 random characters).
4. Trigger a new deploy after adding the environment variables.
5. Add `kennyvillalobos.com` in **Domain management → Add a domain**, then follow Netlify's DNS instructions in GoDaddy. Do not change nameservers or DNS records until Netlify tells you exactly what to enter.

## Important
- The homepage is a starter based on the approved design direction. It uses a Google Font import and a condensed font approximation; it is not a custom licensed distressed font.
- Broadcast Work has a server-verified password gate. The protected project data is returned by a Netlify Function only after authentication. Passwords are never embedded in the HTML or JavaScript.
- The protected page currently contains empty year placeholders from 2014 through 2026. Add only projects you have permission to share. Video files themselves should also be stored behind access controls if they are confidential; do not place private videos in the public site folder.
- The Independent Work, Resume, and About links are visual navigation placeholders pending your content.
- This is a starter package, not yet a finished portfolio. Add your actual project titles, descriptions, approved thumbnails/video embeds, resume, and bio before launch.
