import assert from "node:assert/strict";
import test from "node:test";
import { readTrustedFormCertificate } from "./trustedForm.js";

const formWithValues = (...values) => ({
  querySelectorAll: () => values.map((value) => ({ value })),
});

test("reads a certificate even when another field has not populated", () => {
  const certificate = "https://cert.trustedform.com/example-certificate";
  assert.equal(readTrustedFormCertificate(formWithValues("", certificate)), certificate);
});

test("rejects placeholders and URLs outside the certificate host", () => {
  assert.equal(readTrustedFormCertificate(formWithValues(
    "pending",
    "https://cert.trustedform.com/",
    "http://cert.trustedform.com/example-certificate",
    "https://cert.trustedform.com.example.org/example-certificate",
  )), "");
});
