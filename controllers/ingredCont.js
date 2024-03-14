//Controller incharge or adding and removing ingredients from the database
// Dev: Dayan F 

//TODO: GetAll ingredients function (GET) 
//TODO: Add ingredient function (POST)
//TODO: Remove ingredient function (DELETE)
//TODO: Update ingredient function (PUT)
//TODO: Get ingredient by ID function or by name (GET)


const mongoose = require("mongoose");
const Ingredient = require("../schemas/ingredientSchema");

//GetAllIngredients
exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GetIngredientById with Validation
exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CreateIngredient with Validation
exports.createIngredient = async (req, res) => {
  const ingredient = new Ingredient({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
  });

  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//UpdateIngredient with Validation
exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    ingredient.name = req.body.name;
    ingredient.type = req.body.type;
    ingredient.price = req.body.price;

    const updatedIngredient = await ingredient.save();
    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DeleteIngredient with Validation
exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    await ingredient.remove();
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
