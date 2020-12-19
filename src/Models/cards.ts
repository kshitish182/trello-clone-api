import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  ownedBy: {
    type: String,
    required: true,
  },
});

const Cards = mongoose.model('card', cardSchema);

export default Cards;
