const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require ("jsonwebtoken");
require ("dotenv").config(); // otra maners de importar módulos
const secret = process.env.JWT_SECRET;
const encodedSecret = Buffer.from(secret).toString("base64");

exports.authenticateUser = (req, res) => {
  const {email,password} = req.body;
  userModel
  .findOne({email})
  .then((user) => {
    if (!user) {
        // si no se encuentra el usuario, se devuelve un mensaje de error.
        return res.status(404).json({error:"user not found"});
    }
    bcrypt.compare(password,user.password,function(err, result){
        if(err){
            res.status(500).json({error:err.message})
        }
        else if(result){
            const payload = {
                userId: user._id,
                email: user.email,
                role: user.role
            }
            // si la contraseña coincide, el usuario se autentica exitosamente.
            const token = jwt.sign(
                payload, 
                encodedSecret,
                {expiresIn:"1h"}
            )
            res.status(200).json({message:"authentication was successful. ", token});
            console.log("Clave secreta utilizada para firmar el token:", encodedSecret);
        }
        else{
            // si la contraseña no coincide, se devuelve un mensaje de error.
            res.status(401).json({error:"authentication failed"})
        }
    }
    );
  })
.catch((err)=>res.status(500).json({error:err.message}))
};

