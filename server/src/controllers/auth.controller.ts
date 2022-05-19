import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from '../../../src/models/user';

const googleClient = new OAuth2Client({
  clientId: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
  clientSecret: `${import.meta.env.VITE_GOOGLE_CLIENT_SECRET}`
});

export const authenticateUser = async (req: Request, res:Response) => {
    const {token} = req.body;
    console.log('check', req.body);
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload?.email });
    if (!user) {
      user = await new User({
        email: payload?.email,
        avatar: payload?.picture,
        name: payload?.name,
      });

      await user.save();
    }
    console.log('token', token)
    const {sub, name, email, picture} = payload;

    const userId = sub;
};
