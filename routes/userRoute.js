const User = require("../models/User");
const router = require("express").Router();

// ログイン
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(401).send("Unauthorized!");

        const vailedPassword = req.body.password === user.password;
        if(!vailedPassword) return res.status(401).send('Unauthorized!');

        return res.status(200).json(user);
    }catch(err){
        return res.status(500).json(err);
    }
})

//   会員登録
router.post("/register", async (req, res) => {
    try{
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;

