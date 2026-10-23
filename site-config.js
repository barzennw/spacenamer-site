/* SpaceNamer site configuration — the only file you need to edit to make the
   Buy and Download buttons live.

   Every value marked FILL IN comes from somewhere you control; the site shows
   a setup banner (on localhost only) until they are set, and the buttons stay
   inert rather than sending anyone to a broken page. */
window.SPACENAMER = {

  /* --- Kelviq checkout -------------------------------------------------- */

  /* FILL IN. The product UUID from your Kelviq dashboard. It is the last path
     segment of the "static checkout URL" Kelviq shows for the SpaceNamer
     product: https://www.kelviq.com/buy/<THIS-UUID>/ */
  kelviqProductId: "f0c66956-8b76-4d59-ac01-e1737980510c",

  /* "sandbox" while testing (no real money), "production" when you go live.
     Sandbox checkout lives at kelviq.com/sandbox/buy/<uuid>/. */
  kelviqEnv: "production",

  /* Plan and charge period as the Kelviq dashboard actually serves them.
     NOTE: kelviq.config.ts (pulled 2026-08-30) still calls this plan "pro";
     the live plan identifier is "one-time". The live value is what works. */
  planIdentifier: "one-time",
  chargePeriod: "ONE_TIME",

  /* Where Kelviq sends the buyer after a successful payment. Leave empty to
     use <this site>/thanks.html, which is almost always what you want. */
  successUrl: "",

  /* --- Download --------------------------------------------------------- */

  /* Direct link to the notarized SpaceNamer zip. Anywhere that serves a stable
     URL works: GitHub Releases, R2, S3, your own host. While this is empty the
     download page says so plainly instead of offering a dead button. */
  downloadUrl: "",

  /* Shown next to the download button so people know what they are getting. */
  version: "3.1",
  downloadSize: "",            /* e.g. "2.4 MB" */
  downloadSha256: "",          /* optional, shown for verification */

  /* --- Links ------------------------------------------------------------ */

  /* FILL IN. Kelviq's customer portal, where buyers manage their license. */
  portalUrl: "",

  /* FILL IN. Support address used by the mailto: links. */
  supportEmail: ""
};
