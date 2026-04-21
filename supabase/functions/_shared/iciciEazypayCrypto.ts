/**
 * ICICI Eazypay AES-128-ECB + PKCS7, Base64 ciphertext (matches PHP openssl_encrypt raw output).
 * When reading return URLs in the browser, do not use URLSearchParams for ciphertext values:
 * it decodes "+" as space and breaks Base64 — use decodeURIComponent on raw query pairs instead.
 */
import CryptoJS from "npm:crypto-js@4.2.0";

function aesKeyWordArray(keyStr: string) {
  const normalized = keyStr.trim();
  if (!(normalized.length >= 16)) {
    throw new Error("ICICI AES key must be at least 16 bytes");
  }
  const slice = normalized.slice(0, 16);
  return CryptoJS.enc.Utf8.parse(slice);
}

export function iciciAes128Encrypt(plaintext: string, keyStr: string): string {
  const key = aesKeyWordArray(keyStr);
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function iciciAes128Decrypt(cipherBase64: string, keyStr: string): string {
  const key = aesKeyWordArray(keyStr);
  const clean = cipherBase64.trim().replace(/\s/g, "");
  const params = { ciphertext: CryptoJS.enc.Base64.parse(clean) } as any;
  const decrypted = CryptoJS.AES.decrypt(params, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
