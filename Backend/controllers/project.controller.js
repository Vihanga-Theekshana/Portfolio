const pool = require("../db");

const project = async (req,res)=>{
    try{

        const [values] =await pool.query("SELECT * FROM projects");

        console.log(values);
        return res.status(200).json(values);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"error getting projects"});
    }
     
}
module.exports = {project};
