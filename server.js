const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const apiRoutes = require("./api/routes");
app.use(apiRoutes);
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`App listening at http://localhost:${PORT}`);
  });
});
