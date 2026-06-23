const pool = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req,res)=>{
    const username = req.body.username;
    const passcode = req.body.passcode;
    try{
        

        if(!passcode || !username){
            return res.status(400).json({message:"error login"});
        }

        const [users] = await pool.query("SELECT username,passcode FROM admin WHERE username = ?",[username]);
    
        if(users.length === 0){
            return res.status(400).json({message:"invalid email or password "})
        }

        const user = users[0];

        
        const ok = await passcode == user.passcode ? true : false;

        if(!ok){
            return res.status(400).json({message:"invalid email or password "})
        }

        let token = jwt.sign({username:user.username},process.env.JWT_SECRET,{expiresIn:60 * 60});

    
       
        return res.status(200).json({message:"login successful",token});
 
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"server error"});
    }
    



}

module.exports = {login};