interface GoogleUser {
  _id: string;
  iss: string,
  nbf: number;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
}

export { GoogleUser };
