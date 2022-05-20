const express = require('express');

import { authenticateUser } from "../controllers/auth.controller";

const router = express.Router();

const authenticateUser = async (req, res) => {
    const {token} = req.body;
    res.send('she')
};

router.post("/", authenticateUser);

module.exports = router;
