const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  tag: { type: String, required: true },
  item: [
    {
      type: mongoose.Types.ObjectId, required: false, ref: 'Item'
    },
  ],
  
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date },
});

module.exports = mongoose.model('Todo', todoSchema);
