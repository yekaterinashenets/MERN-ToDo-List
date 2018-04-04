// Item.js
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ItemSchema = Schema({  
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  isDone: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});
mongoose.model('Item', ItemSchema);
module.exports = mongoose.model('Item');