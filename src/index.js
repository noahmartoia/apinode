import "dotenv/config";
import express from "express";
import carsRoutes from "./routes/cars.js";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import { handleUncaughtErrors } from "./Middlewares/error.js";
import isAuth from "./Middlewares/auth.js";

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_STRING = process.env.MONGO_STRING;

// Middlewares
// Middleware qui permet de parser les donnees issues d'un formulaire
app.use(express.json());

app.use("/cars", isAuth, carsRoutes);
app.use("/auth", authRoutes);

app.use("/error", (req, res) => {
  try {
    //
    throw new Error("This is an error");
  } catch (error) {}
});

// Middleware pour gerer les erreurs
app.use(handleUncaughtErrors);

mongoose.connect(MONGO_STRING).then(() => {
  console.log("Connected to the database!");

  // On lance le serveur
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});