import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Model = mongoose.model;

export const ClientSchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter a first name'
  },
  lastName: {
    type: String,
    required: 'Enter a last name'
  },
  email: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props: { value: any; }) => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
    required: 'Enter a phone number',
    validate: {
      validator: function (v: string) {
        return /^\+?1?[-.\s]?(\([2-9]\d{2}\)|[2-9]\d{2})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(v);
      },
      message: (props: { value: any; }) => `${props.value} is not a valid North American phone number!`
    }
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

export const Client = Model("Client", ClientSchema);