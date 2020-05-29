 /*
*  Import external packages here;
*/
const mongoose = require('mongoose');

const establishConnection = async () => {
    try {
        return await mongoose.connect(
            process.env.DB_URL,
            {
               useNewUrlParser: true,
               useUnifiedTopology: true
            },
        );
    } catch (error) {
        mongoose.disconnect();
        throw error;
    }
};

module.exports = establishConnection;