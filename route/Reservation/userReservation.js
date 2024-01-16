const {reservation}=require('../../db/sequelize')
const isAuth=require('../UsersGestion/isAuth')
module.exports = (app) =>{
    app.get('/api/reservation/user/',isAuth,(req,res)=>{
        const user=req.userEmail;
        reservation.findAll({where:{emailUser:user}})
        .then(response=>{
            
            if(response.length>0){
                res.status(200).json({response})
            }else{
                res.json({msg:"No reservation Found"})
            }
        })
        .catch(error=>{console.log(error)})
    })
}