import mongoose from "../providers/database/connection";

const {Schema, model} = mongoose

const destinationSchema = new Schema({
  name: {type: String},
  location:{
    address: String,
    coordinates: String
  },
  type:{
    enum:['city', 'country', 'natural']
  }
})