// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
      res.locals.favorites = user?.favorites;

      next();
    } else {
      res.send({ error: 'Please enter a valid email' });
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
      res.send({error: `${responseStr}`});
    } else {
      next();
    }
  } catch (error) {
    res.send({ error });
  }
}

export const googleLogin = async (req: Request, res: Response, next: any) => {
  if (req.body.googleUser) {
    const {googleUser} = req.body;
    let enrolled = await User.findOne({ email: googleUser?.email});

    if (!enrolled) {
      enrolled = await new User({
        email: googleUser.email,
        avatar: googleUser.picture,
        name: googleUser.name,
      });
      await enrolled.save();
    }

    res.status(200).json({enrolled, googleUser})
  } else {
    next();
  }
}

export const authenticateCRUDUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(`${res.locals.id}`);

    if (req.body.password === user?.password) {
      let idKey = encryptor.encrypt(`${user?.id}`);
      res.cookie("ID", idKey, {
        maxAge: 1080000000,
        httpOnly: true
      })
      res.send({ passwordMatch: true, loggedIn: true, ingredients: res.locals.ingredients, favorites: res.locals.favorites });
    } else {
      res.send({ error: 'You entered an incorrect password' });
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

export const refreshContext = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.id);
  res.send({ id: user?.id, ingredients: user?.ingredients, recipes: user?.ingredients, favorites: user?.favorites });
};

export const ingredientList = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(`${req.body.id}`);
    res.send(user.ingredients);
  } catch (error) {
    res.send({error});
  }
};

export const addIngredient = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.id);
  let userIngredients = user?.ingredients;
  userIngredients.push(req.body.ingredient);
  res.send(user?.save());
};

export const removeIngredient = async (req: Request, res: Reponse) => {
  const user = await User.findById(req.body.id);
  let userIngredients = user?.ingredients;

  let result = userIngredients.filter(ingredient => ingredient.text !== req.body.ingredient.text);
  while (userIngredients.length > 0) {
    userIngredients.pop();
  }
  for (let i = 0; i < result.length; i++) {
    userIngredients.push(result[i]);
  }
  res.send(user?.save());
};

export const addFavorite = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.id);
  let userFavorites = user?.favorites;


  userFavorites.push(req.body.recipe);
  res.send(user?.save());
};

export const removeFavorite = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.id);
  let userFavorites = user?.favorites;

  let result = userFavorites.filter(recipe => recipe.title !== req.body.recipe.title);
  while (userFavorites.length > 0) {
    userFavorites.pop();
  }
  for (let i = 0; i < result.length; i++) {
    userFavorites.push(result[i]);
  }
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
