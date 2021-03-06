const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).catch(err => console.log(err));

        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la DB de Mongo');
    }

};


module.exports = {
    dbConnection
};