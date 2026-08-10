# halcyondays-2

Basic Personal Landing Page

## Local development

```bash
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

The static site is output to the `dist/` directory.

## Deploy to Cloudflare Pages

1. Connect the repository in the Cloudflare Pages dashboard.
2. Use the following build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Deploy.

No environment variables or paid plugins are required.

## Notes

- `index.html` uses `https://halcyond.net/ashley.jpg` for `og:image` and `twitter:image`. Update these if the domain or image changes.
- The waybar clock is the only live dynamic feature; the previous WiFi stats widget has been removed.
