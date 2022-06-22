const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('breed', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: true,
			unique: true,
			primaryKey: true,
			autoincrement: true,
		},
		breedName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		temperament: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		weight: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		height: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lifeExpectancy: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdInFront: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})
}
