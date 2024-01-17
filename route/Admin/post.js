const {admin}=require('../../db/sequelize')
module.exports=(app)=>{
    app.get('/api/admin/post',(req,res)=>{
       admin.findAll()
       .then(response=>{
        if(response.length>0){
            res.status(201).json({response})
        }else{
            res.status(401).json({msg:"No User Found"})
        }
       })
    })
}