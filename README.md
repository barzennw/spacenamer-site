# SpaceNamer website

Static marketing site for SpaceNamer, served by GitHub Pages.

## Editing

Plain HTML and CSS, no build step. Open any `.html` file and edit it.

To preview locally:

    python3 -m http.server 4173

then open http://localhost:4173

## Configuration

`site-config.js` holds every value the site needs at runtime:

| Key | What it does |
|---|---|
| `kelviqProductId` | Kelviq product UUID; builds the checkout URL |
| `kelviqEnv` | `production` or `sandbox` |
| `downloadUrl` | Direct link to the notarized app zip |
| `portalUrl` | Kelviq customer portal |
| `supportEmail` | Used by every mailto: link |

`buy.js` reads these and wires the Buy and Download buttons. If a value is
missing the matching button is disabled rather than broken, and a setup
banner appears when the site is opened on localhost.

## Deploying

Push to `main`. GitHub Pages publishes from the branch root.
`CNAME` holds the custom domain.
