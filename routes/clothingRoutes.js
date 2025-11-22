const express = require("express");
const router = express.Router();
const clothingController = require("../controllers/clothingController");

router.get("/", clothingController.getAllClothing);

router.get("/:id", clothingController.getClothingById);

router.post("/", clothingController.createClothingItem);

router.put("/:id", clothingController.updateClothingItem);

router.patch("/:id", clothingController.partialUpdateClothingItem);

router.delete("/:id", clothingController.deleteClothingItem);

module.exports = router;
