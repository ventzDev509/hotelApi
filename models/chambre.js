module.exports = (sequelize, DataTypes) => {
    return sequelize.define("room", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codeChambre:{
        type:DataTypes.STRING,
        allowNull:false
      },
      roomType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nightlyPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      numberOfPersons: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amenities: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Libre",
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    });
  };
  