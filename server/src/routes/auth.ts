const express = require('express');

import { authenticateUser } from "../controllers/auth.controller";

export const router = express.Router();

router.post("/", authenticateUser);
