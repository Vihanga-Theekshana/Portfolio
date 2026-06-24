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
const deleteproject = async (req,res)=>{
    try{
        const id = req.params.id;
        const value = await pool.query("DELETE from projects WHERE id = ?",[id]);
        return res.status(200).json({message:"project deleted successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"error deleting project"});
    }
    
}
module.exports = {project,deleteproject};
