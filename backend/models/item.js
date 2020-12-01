const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  text: { type: String, required: true },
  finished:{type:Boolean},
  finishAt: { type: Date },
  createdAt: { type: Date },
  isChecked:{type:Boolean},
  tag: { type: mongoose.Types.ObjectId, required: true, ref: 'Todo' },
});

module.exports = mongoose.model('Item', itemSchema);