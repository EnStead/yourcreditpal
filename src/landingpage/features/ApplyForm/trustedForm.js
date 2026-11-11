export function readTrustedFormCertificate(form) {
  const fields = form?.querySelectorAll('input[name="xxTrustedFormCertUrl"]') ?? [];
  for (const { value } of fields) {
    try {
      const url = new URL(value);
      if (url.origin === "https://cert.trustedform.com" && url.pathname !== "/") {
        return value;
      }
    } catch {
      // The SDK may not have populated this field yet.
    }
  }
  return "";
}
