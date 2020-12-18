import mongoose from 'mongoose';

const listSubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: Number,
    required: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cards',
  },
});

const defaultList = [
  {
    name: 'Todo',
    createdOn: Date.now(),
    level: 0,
  },
  {
    name: 'In progress',
    createdOn: Date.now(),
    level: 1,
  },
  {
    name: 'Done',
    createdOn: Date.now(),
    level: 2,
  },
];

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  lists: {
    type: [listSubSchema],
    default: defaultList,
  },
});

const Board = mongoose.model('board', boardSchema);

export const List = mongoose.model('list', listSubSchema);
export default Board;
