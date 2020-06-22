import mongoose = require('mongoose');
import config from '../config';

const connect = async () => {
    const dbHost: any = config.mongo.host;
    const uris: string = `${dbHost.URI}${dbHost.host}/${dbHost.database}`;
    const db = mongoose.connection;

    const performConexion = () => mongoose.connect(uris,
        {
            server: {
                auto_reconnect: true
            },
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
    db.on('error', (error) => {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
        process.exit(-1)
    });

    db.on('connected', () => {
        console.log('Successfully connected');
    });

    db.once('open', () => {
        console.log('MongoDB connection opened!');
    });

    db.on('reconnected', () => {
        console.log('MongoDB reconnected!');
    });

    db.on('disconnected', async () => {
        console.log('MongoDB disconnected!');
        await performConexion();
    });

    await performConexion();

    mongoose.Promise = global.Promise;
}

export default connect;