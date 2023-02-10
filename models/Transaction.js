
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

    amount:{ type: Number, required: true},
    type: { type: String, required: true},
    category: { type: String, required: true},
    date: { type: Date, required: true},
    reference: { type: String, required: true},
    description: { type: String, required: true},
    user_id: { type: String, required: true}
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 

});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;



