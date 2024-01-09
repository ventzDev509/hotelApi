module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telephone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "0000-00-00",
      },
      profile: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "null",
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
