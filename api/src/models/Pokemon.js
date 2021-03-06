const { DataTypes } = require('sequelize');
const { DEFAULT_IMAGE } = require('../utils/constants')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'Pokemon',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'It requires a valid name',
					},
				},
			},
			hp: {
				type: DataTypes.INTEGER,
			},
			attack: {
				type: DataTypes.INTEGER,
			},
			defense: {
				type: DataTypes.INTEGER,
			},
			speed: {
				type: DataTypes.INTEGER,
			},
			height: {
				type: DataTypes.INTEGER,
			},
			weight: {
				type: DataTypes.INTEGER,
			},
			image: {
				type: DataTypes.STRING,
				defaultValue: DEFAULT_IMAGE
			},
		},
		{ timestamps: false }
	);
};
