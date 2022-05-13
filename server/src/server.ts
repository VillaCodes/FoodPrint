const PORT = process.env.PORT || 3001;

import app = require("./app")


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
