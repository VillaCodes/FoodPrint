import CryptoJS from 'crypto-js';
const key = `${process.env.VITE_ENCRYPT_KEY}`;

export const encryptor = {
  encrypt(text: string) {
    return CryptoJS.AES.encrypt(text, key).toString();
  },
  decrypt(ciphertext: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
};
