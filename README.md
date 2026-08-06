# Aicha Belghiti — Portfolio

Static portfolio site (HTML / CSS / JavaScript). No build step, no dependencies.

## Structure
```
index.html        Main page
css/style.css     Styles + responsive rules
js/script.js      Scroll progress, reveal-on-scroll, mobile nav, contact form
images/           Photos, certificate, case-study images
```

## Run locally
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server
```

## Publish on GitHub Pages (free)
1. Create a new repository on GitHub.
2. Upload all the files in this folder (keep the folder structure).
3. Repository → **Settings → Pages**.
4. Under **Source**, choose branch `main` and folder `/ (root)`, then **Save**.
5. Your site goes live at `https://<username>.github.io/<repository>/`.

All paths are relative, so it works from any subfolder.

## Notes
- The contact form is front-end only (shows a confirmation on submit). To receive
  real messages, connect a service such as Formspree, Getform, or Netlify Forms.
- Replace any image in `images/` with your own — keep the same filename to avoid
  editing the HTML.
