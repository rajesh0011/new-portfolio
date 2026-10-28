// Fallback preview for projects that have no image uploaded in the CMS yet:
// a live screenshot of the project's website. Upload a real image in /admin to override it.
export function getScreenshotUrl(url) {
  if (!url) return "";
  return `https://image.thum.io/get/width/1200/crop/760/noanimate/${url}`;
}
