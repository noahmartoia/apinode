import express from "express";
import {
  createCar,
  deleteCar,
  getCar,
  getCars,
  getError,
  udpateCar,
} from "../controller/cars.js";
import { body } from "express-validator";

const router = express.Router();

// GET http://localhost:3001/cars
router.get("/", getCars);

// GET http://localhost:3001/cars/1
router.get("/:id", getCar);

// POST http://localhost:3001/cars
router.post(
  "/",
  [
    body("brand").trim().isLength({ max: 20, min: 2 }),
    body("model").trim().isLength({ min: 2, max: 100 }),
  ],
  createCar
);

// PUT http://localhost:3001/cars/1 creer une route qui
// permet de modiier une voiture
router.put("/:id", udpateCar);

// DELETE http://localhost:3001/cars/1 creer une route qui
// permet de supprimer une voiture
router.delete("/:id", deleteCar);

// ERROR
router.get("/error", getError);

// Ceci est un export default, on peut en avoir
// qu'un seul par fichier (module)
export default router;