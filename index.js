const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const backend = require("./src/api.js")
var Datastore = require('nedb')
  , db = new Datastore();

db.insert({ contact: "pablo"});
db.insert({ contact: "pedro"});

app.use(bodyParser.json());

backend(app,db);

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
