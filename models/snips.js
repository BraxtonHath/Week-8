const mongoose = require('mongoose');

const snipSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  body: String,
  language: String,
  tags: [{type: String}],
  notes: [{type: String}]
});

const Snip = mongoose.model('Snip', snipSchema);
module.exports = Snip;
