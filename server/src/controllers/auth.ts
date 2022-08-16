// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../../../src/models/user.ts";
import dotenv from "dotenv";
import { allowedMethods } from "../../../src/utils/Constants.ts";
import { validations } from "../../../src/utils/Validation.ts";
import { encryptor } from '../../../src/utils/Encrypt.ts';

dotenv.config();

const findExistingEmail = async (email: string) => {
  const emailCheck = await User.findOne({email: `${email}`});
  if (!emailCheck) return false;
  return true;
};

export const emailCheck = async (req: Request, res: Response, next: any) => {
  try {
    if (!allowedMethods.includes(req.method)) {
      res.status(405).send(`${req.method} not allowed.`);
    }

    const email = req.body.email;
    if (validations.email(email) && await findExistingEmail(email)) {
      const user = await User.findOne({email: `${email}`});

      res.locals.id = user?._id;
      res.locals.ingredients = user?.ingredients;

      next();
    } else {
      res.send({emailCheck: 'Please enter a valid email'});
    }
  } catch (error) {
    res.send(error);
  }
};

export const validateUser = async (req: Request, res: Response, next: any) => {
  try {
    if (!allowedMethods.includes(req.method)) {
      res.status(405).send(`${req.method} not allowed.`);
    }

    const { name, email, password } = req.body

    let responseStr = ''

    if (!validations.name(name)) {
      responseStr += 'Your username cannot be under 5 characters. ';
    }

    if (!validations.email(email)) {
      responseStr += 'Your email must be valid. ';
    }

    if (!validations.password(password)) {
      responseStr += 'Your password cannot be under 8 characters.';
    }

    if (responseStr.length > 0) {
      res.send({errorMessage: `${responseStr}`});
    } else {
      next();
    }
  } catch (error) {
    res.send({ error });
  }
}

const googleClient = new OAuth2Client({
  clientId: process.env.VITE_GOOGLE_CLIENT_ID,

  clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET
});

export const authenticateGoogleUser = async (req: Request, res: Response, next: any) => {

  if (req.body.token) {
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
  } else {
    next();
  }
};

export const authenticateCRUDUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(`${res.locals.id}`);

    if (req.body.password === user?.password) {
      let idKey = encryptor.encrypt(`${user?.id}`);
      res.cookie("ID", idKey, {
        maxAge: 1080000000,
        httpOnly: true
      })
      res.send({ passwordMatch: true, loggedIn: true, ingredients: res.locals.ingredients });
    } else {
      res.send({passwordMatch: 'You entered an incorrect password'});
    }
  } catch (error) {
    res.send({error});
  }
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

export const logoutUser = async (req: Request, res: Response) => {
  let string = JSON.stringify(req.cookies["ID"])
    res.cookie('ID', 'none', {
        expires: new Date(Date.now() + 5 * 1000)
    });
    res.send({ success: true, message: 'User logged out successfully' })
};

export const cookieCheck = async (req: Request, res: Response) => {
  if (req.cookies["ID"] && req.cookies["ID"] !== "none") {
    res.send({ cookiePresent: true, id: req.cookies["ID"] })
  }
};

export const ingredientList = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(`${req.body.id}`);
    res.send(user.ingredients);
  } catch (error) {
    res.send({error});
  }
};

export const saveIngredient = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.id);
  user?.ingredients.push(req.body.ingredient);
  res.send(user?.save());
};

export const findUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.send({data: users});
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    user?.save();

    res.send({ data: user });
  } catch {
    res.status(404).send({ error: "User Not found" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    await user?.remove();

    res.send({ data: true });
  } catch {
    res.status(404).send({ error: "user not found" });
  }
};
