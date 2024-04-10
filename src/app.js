const express = require("express");
const helmet = require("helmet");
const cors = require('cors');

require("dotenv").config({ path: "./config/dev.env"});
require("./db/mongoose");
const vendorRouter = require("./routers/admin.router");
const contextPath = "/rest/api";
const app = express();
app.use(express.json());
app.use(contextPath, vendorRouter);
require("./swagger/swagger")(app);
app.use(helmet());
app.use(cors());
const PORT = process.env.PORT;
app.get("/",(req, res)=>{
    res.send("This is the authority panel..")
})

const server = app.listen(PORT,() => 
  console.log(`server running on port ${PORT}`)
);