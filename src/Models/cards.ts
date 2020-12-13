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
  createdOn: {
    type: Date,
    default: Date.now,
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boards',
    required: true,
  },
});

const Cards = mongoose.model('card', cardSchema);

export default Cards;
