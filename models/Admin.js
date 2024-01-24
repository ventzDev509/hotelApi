module.exports = (sequelize, DataTypes) => {
    return sequelize.define('admin', {
       username:{
        type:DataTypes.STRING(30),
        allowNull:false
       },
       password:{
        type:DataTypes.STRING,
        allowNull:false
       }
    },
    {
        timestamps: true,
        createdAt: "created",
        updatedAt: false,
      }
    )
}