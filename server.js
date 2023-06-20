require("dotenv").config();

const { createApp } = require("./app.js");
const appDataSource = require("./models/dataSource.js");

const startServer = async () => {
    const app = createApp();
    const PORT = process.env.PORT || 3000;

    appDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      appDataSource.destroy();
    });


    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

};

startServer();