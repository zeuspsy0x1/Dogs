const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('temperament', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			autoincrement: true,
			primaryKey: false,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true,
			allowNull: false,
		},
	})
}
