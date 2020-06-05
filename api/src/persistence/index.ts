import mongoose = require('mongoose');
import config from '../config';

const connect = async () => {
    const dbHost: any = config.mongo.host;
    const uris: string = `${dbHost.URI}${dbHost.host}:${dbHost.port}/${dbHost.database}`;

    mongoose.connect(uris, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err){
            console.error(err);
            process.exit(-1)
        };
      
        console.log('Successfully connected');
      
    });

    mongoose.Promise = global.Promise;
}

export default connect;