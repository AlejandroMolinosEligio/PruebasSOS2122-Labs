const express = require("express");
const bodyParser = require("body-parser");
const back = require("./src/back");

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());

back(app);


app.use("/",express.static("./public"));

app.listen(port, () => {
    console.log(`Server ready at port ${port}!`);
});
