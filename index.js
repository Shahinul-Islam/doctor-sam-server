const express = require("express");
const cors = require("cors");

const app = express();

// middle wares
app.use(cors());
app.use(express.json());
