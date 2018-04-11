const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const signatureSchema = new Schema({
  name: {
    type:String
  },
  quote: {
    type:String
  },
})
const Signature = mongoose.model('Signature', signatureSchema);
module.exports = Signature;
