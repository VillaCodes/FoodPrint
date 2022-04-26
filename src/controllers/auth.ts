import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user";

const googleClient = new OAuth2Client({
  clientId: `874175832974-9rp5qutlghm7hc0squk4imihjpj16s1g.apps.googleusercontent.com`,
  clientSecret: `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`
});

export const authenticateUser = async (req: Request, res: Response) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: `$874175832974-9rp5qutlghm7hc0squk4imihjpj16s1g.apps.googleusercontent.com`,
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

  res.json({ user, token });
};
