const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i)

export const validations = {
  name(name: string) {
    if (name.length >= 5) return true;
    return false;
  },
  email(email: string) {
    if (Regex.test(email)) return true;
    return false;
  },
  password(password: string) {
    if (password.length >= 8) return true;
    return false;
  }
};