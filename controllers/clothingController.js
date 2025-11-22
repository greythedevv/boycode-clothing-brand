let clothingItems = require("../data/clothing");

exports.getAllClothing = (req, res) => {
  const { category, inStock } = req.query;

  let result = clothingItems;

  if (category) {
    result = result.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (inStock !== undefined) {
    const inStockBool = inStock === "true";
    result = result.filter((item) => item.inStock === inStockBool);
  }

  res.status(200).json({ count: result.length, data: result });
};

exports.getClothingById = (req, res) => {
  const id = Number(req.params.id);
  const item = clothingItems.find((c) => c.id === id);

  if (!item) {
    return res.status(404).json({ message: "Clothing item not found" });
  }

  res.status(200).json(item);
};

exports.createClothingItem = (req, res, next) => {
  try {
    const { name, category, size, price, inStock } = req.body;

    if (!name || !category || !price) {
      return res
        .status(400)
        .json({ message: "name, category, and price are required" });
    }

    const newItem = {
      id: Date.now(),
      name,
      category,
      size: size || [],
      price,
      inStock: inStock || true,
    };

    clothingItems.push(newItem);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

exports.updateClothingItem = (req, res) => {
  const id = Number(req.params.id);
  const index = clothingItems.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Clothing item not found" });
  }

  const { name, category, size, price, inStock } = req.body;

  if (!name || !category || price === undefined) {
    return res
      .status(400)
      .json({ message: "name, category, and price are required" });
  }

  clothingItems[index] = {
    id,
    name,
    category,
    size: size || [],
    price,
    inStock: inStock || true,
  };

  res.status(200).json(clothingItems[index]);
};

exports.partialUpdateClothingItem = (req, res) => {
  const id = Number(req.params.id);
  const item = clothingItems.find((c) => c.id === id);

  if (!item) {
    return res.status(404).json({ message: "Clothing item not found" });
  }

  const { name, category, size, price, inStock } = req.body;

  if (name !== undefined) item.name = name;
  if (category !== undefined) item.category = category;
  if (size !== undefined) item.size = size;
  if (price !== undefined) item.price = price;
  if (inStock !== undefined) item.inStock = inStock;

  res.status(200).json(item);
};

exports.deleteClothingItem = (req, res) => {
  const id = Number(req.params.id);
  const exists = clothingItems.some((c) => c.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Clothing item not found" });
  }

  clothingItems = clothingItems.filter((c) => c.id !== id);
  res.status(200).json({ message: "Clothing item deleted successfully" });
};
