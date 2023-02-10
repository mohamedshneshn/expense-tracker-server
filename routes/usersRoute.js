const express = require('express');


const router = express.Router();


const User = require('../models/User');


router.post('/login', (req, res) => {  // Login route for user to check if user exists in database
    const { email, password } = req.body;

    User.findOne ({ email }) 
        .then(user => {
            if (!user) {
                return res.status(400).json({ email: 'User Not Found' });
            }
            if (password === user.password) {
                res.json({user});
            } else {
                return res.status(400).json({ password: 'Incorrect Password' });
            }
        }
    );
});

router.post('/register', (req, res) => {  // Register route for user to add new user to database
     const { name, email, password } = req.body;
    //  console.log(req.body);
    //  console.log(name, email, password);
       
        User.findOne({ name: name })
            .then(user => {
                if (user) {
                    return res.status(400).json({ name: 'Username already exists' });
                } 
                else {
                    User.findOne({ email: email })
                    .then(user => { 
                        if (user) {
                            return res.status(400).json({ email: 'Email already exists' });
                        } 
                        else {
                            const newUser = new User({
                                name,
                                email,
                                password
                            });
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        }
                    }
                );
                }
            }
        );
});

module.exports = router;


 