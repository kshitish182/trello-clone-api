import mongoose from 'mongoose';

const listSubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const defaultList = [
  {
    name: 'Todo',
    level: 0,
  },
  {
    name: 'In progress',
    level: 1,
  },
  {
    name: 'Done',
    level: 2,
  },
];

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  lists: {
    type: [listSubSchema],
    default: defaultList,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'card',
    },
  ],
});

const Board = mongoose.model('board', boardSchema);

export const List = mongoose.model('list', listSubSchema);
export default Board;
