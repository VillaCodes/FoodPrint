const express = require("express");

const PORT = process.env.PORT || 3001;

const app = require("./app.ts")


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
