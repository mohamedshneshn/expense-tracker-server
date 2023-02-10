const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const moment = require('moment');




router.post('/user-transactions', (req, res) => {  //to get all transactions from database for a particular user
//    console.log(req.body.customDate);   // 1, 7, 30, 90, 180, 365, custom
//    console.log(req.body.selectedCustomDate);  // [2020-01-01T00:00:00.000Z, 2020-01-31T00:00:00.000Z]
//     console.log(req.body.customType);  // all, income, expense

    Transaction
        .find({ 
            ...(req.body.customDate !== 'custom' ? 
              { date : { $gte: moment().subtract(Number(req.body.customDate), 'days').toDate() } }
               : 
               { date : { $gte: req.body.selectedCustomDate[0], $lte: req.body.selectedCustomDate[1] } } ) //we put ...
               ,                                                                       //filter by date
               user_id: req.body.user_id,                                              //filter by user
                ...(req.body.customType !== 'all' && { type: req.body.customType })    //filter by type
            })
        .sort({ date: -1 })
        // .where ('date').gte(moment().subtract(Number(req.body.customDate), 'days').toDate())
        // .where('date').gte(req.body.selectedCustomDate[0]).lte(req.body.selectedCustomDate[1])
        
        .then(transactions => res.json(transactions))
        .catch(err => console.log(err));
}
);


router.post('/add-transaction', (req, res) => {  //to add transaction to database
    const newTransaction = new Transaction({
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        reference: req.body.reference,
        description: req.body.description,
        user_id: req.body.user_id
        // user: req.body.user
    });

    newTransaction.save()
        .then(transaction => res.json(transaction))
        .catch(err => console.log(err));
}
);

router.post('/edit-transaction', (req, res) => {  //to edit transaction in database

   Transaction.findByIdAndUpdate(req.body._id, {
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        reference: req.body.reference,
        description: req.body.description,
        user_id: req.body.user_id
    }, { new: true })
        .then(transaction => res.json(transaction))
        .catch(err => console.log(err));
}
);

router.post('/delete-transaction', (req, res) => {  //to delete transaction from database

    Transaction.findByIdAndDelete(req.body._id)
        .then(transaction => res.json(transaction))
        .catch(err => console.log(err));
}
);



module.exports = router;