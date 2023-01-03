const express = require('express')
const path = require('path')
const body_Parser = require('body-parser')
const userController= require("../controllers/controllers")
const router = express.Router();
router.use(body_Parser.urlencoded({extended:true}));

router.get('/',userController.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname ,"../public/js","main.html" ) )
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname ,"../public/js","register.html"))
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname ,"../public/js","login.html"))
});

router.get('/profile', userController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.sendFile(path.join(__dirname ,"profile.html"))
    } else {
        res.sendFile(path.join(__dirname ,"../public/js","login.html"))
    }
})

router.all("/*", (req, res) => 
{ console.log(req.params.productId)
    res.status(400).send({ status: false, message: "Endpoint is not correct" }) })

    ////////////

    router.post('/register', userController.register)
    router.post('/login', userController.login);
    router.get('/logout', userController.logout);

module.exports = router;