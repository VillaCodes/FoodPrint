import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../../../src/models/user";
import { validations } from '../../../src/utils/Validation';
import dotenv from "dotenv";

dotenv.config();

const findExistingEmail = async (email: string) => {
  const emailCheck = await User.findOne({email: `${email}`})
  if (!emailCheck) return false;
  return true;
}

export const validateUser = async (req: Request, res: Response, next: any) => {
  try {
    const { name, email, password } = req.body
    let responseStr = ''
    if (validations.name(name)) {
      responseStr += 'Your username cannot be under 5 characters. ';
    }
    if (validations.email(email)) {
      responseStr += 'Your email must be valid. ';
    }
    if (validations.password(password)) {
      responseStr += 'Your password cannot be under 8 characters.'
    }
    if (responseStr.length > 0) {
      res.send({errorMessage: `${responseStr}`});
    } else {
      next();
    }
  } catch (error) {
    res.send({ error })
  }
}

const googleClient = new OAuth2Client({
  clientId: process.env.VITE_GOOGLE_CLIENT_ID,
  clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET
});

export const authenticateUser = async (req: Request, res: Response) => {
  const {token} = req.body;

  const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID
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

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const emailCheck: any = await findExistingEmail(req.body.email)
    if(!emailCheck) {
      const user = new User(req.body);
      await user.save();
      res.send({ emailExists: false })
    } else {
      res.send({ emailExists: true })
    }
  } catch (error) {
    res.send({ error: error });
  }
};

export const findUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.send({data: users});
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
    user?.save();
    res.send({ data: user });
  } catch {
    res.status(404).send({ error: "User Not found" });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    await user?.remove();
    res.send({ data: true });
  } catch {
    res.status(404).send({ error: "user not found" });
  }
}
