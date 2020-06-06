import mongoose = require('mongoose');
import config from '../config';

const connect = async () => {
    const dbHost: any = config.mongo.host;
    const uris: string = `${dbHost.URI}${dbHost.host}/${dbHost.database}`;
    const db = mongoose.connection;

    const performConexion = () => mongoose.connect(uris, { server: { auto_reconnect: true }, useNewUrlParser: true, useUnifiedTopology: true});
    
    db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
        process.exit(-1)
    });

    db.on('connected', function() {
        console.log('Successfully connected');
    });

    db.once('open', function() {
        console.log('MongoDB connection opened!');
    });

    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });

    db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        performConexion();
    });

    performConexion();

    mongoose.Promise = global.Promise;
}

export default connect;