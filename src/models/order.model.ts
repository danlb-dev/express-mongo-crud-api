import mongoose from "mongoose";
import { Client } from "./client.model";
import { Product } from "./product.model";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Client.modelName,
    required: true,
  },
  products: {
    type: [
      new Schema(
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product.modelName,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
        { _id: false }
      )
    ],
    required: true,
    validate: {
      validator: (val: any[]) => val.length > 0,
      message: 'At least one product is required.'
    }
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
});

export default OrderSchema;