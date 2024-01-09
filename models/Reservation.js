
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("reservation", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
        ,
        emailUser: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        FullName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        addresse: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        NumberOfPerson: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        codeChambre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateDebut: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateFin: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: "created",
        updatedAt: false,
    })
}