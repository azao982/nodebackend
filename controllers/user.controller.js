const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//fonction registrer user 
exports.signup =(req,res)=>{

    const data = {
        //hnee bsh nbadel les attributs haseeb elii annndi 
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password,10) ,
        bio : req.body.bio,
        picture : req.body.picture,
        birthdate : req.body.birthdate
    }
const _user = new User(data);

_user.save().then(
    (createdUser)=> {
        res.status(200).json({createdUser})
    }
).catch(
    (err)=>{
res.status(400).json({error})
    }
)
}
//fonction login 
exports.signin = async (req, res) => {
    // f west l const nbadel les attributs elii aannddi 
    const { email, password } = req.body;
//fonction bsh tethabetli edha ken l user deja aameel inscri welaa lee 
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Email invalid..." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign(
                { data: { id: user._id, role: user.role } },
                process.env.CLE,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Success...",
                token: token,
                user: user
            });
        } else {
            return res.status(400).json({ message: "Password invalid..." });
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
