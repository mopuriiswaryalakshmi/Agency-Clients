/*
* Import external packages here;
*/
const mongoose = require('mongoose');

/*
* Import project packages here
*/
const { Schema } = mongoose;
        
const AgencySchema = new Schema({
	name: {
		type: String,
        required: true,
	},
	Address1: {
		type: String,
		required: true,
	},
	Address2: {
		type: String,
		required: false
	},
	state: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
    },
    phoneNumber: {
		type: String,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

const Agency = mongoose.model('agency', AgencySchema, 'agency');

module.exports = {
	Agency
}
