import mongoose = require('mongoose');
import * as config from 'config';

const connect = async () => {
    const dbHost: any = config.get('mongo.host');
    const dbCredentials: any = config.get('mongo.credentials');
    console.log({dbHost})
    console.log({dbCredentials})
    mongoose.connect(`${dbHost.URI}${dbCredentials.username}:${dbCredentials.password}@${dbHost.host}:${dbHost.port}/${dbHost.database}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) process.exit(-1);
      
        console.log('Successfully connected');
      
    });

    mongoose.Promise = global.Promise;
}

export default connect;