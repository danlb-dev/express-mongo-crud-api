import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Model = mongoose.model;

export const ProductSchema = new Schema({
  name: {
    type: String,
    required: "Enter a product name",
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: "Enter a product price",
  },
  stock: {
    type: Number,
    default: 0,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export const Product = Model("Product", ProductSchema);