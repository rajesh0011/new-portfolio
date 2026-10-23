// The contact address comes from the CONTACT_TO_EMAIL environment variable
// so it is never hardcoded in the repo or baked into the build output.
export function getContactEmail() {
  return process.env.CONTACT_TO_EMAIL || "";
}
