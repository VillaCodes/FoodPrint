import {Request, Response} from "express";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authenticateUser = async (req: Request, res:Response) => {
    const {token} = req.body;

    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: `${process.env.GOOGLE_CLIENT_ID}`
    });

    const payload = ticket.getPayload();

    console.log(`User ${payload.name} verified`);

    const {sub, name, email, picture} = payload;

    const userId = sub;
}; 