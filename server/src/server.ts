const express = require("express");

const PORT = process.env.PORT || 5000;

const app = require("./app.ts")


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
