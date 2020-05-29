/*
* Import external packages here;
*/
const mongoose = require('mongoose');

/*
 *  Import project packages here;
 */
const { Agency } = require('./agency');
const { Schema } = mongoose;
        
const clientSchema = new Schema({
	agencyId: {
        type: Schema.Types.ObjectId,
        ref: Agency,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	totalBill: {
		type: Number,
		required: true
    },
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

const Client = mongoose.model('client', clientSchema, 'clients');

module.exports = {
	Client
}