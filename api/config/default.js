export default {
    port: 3000,
    mongo: {
        host: {
            URI: "mongodb://",
            host: "mongo",
            database: "market-blockchain",
            port: 27017
        },
        credentials: {
            username: process.env.MONGO_INITDB_ROOT_USERNAME,
            password: process.env.MONGO_INITDB_ROOT_PASSWORD
        }
    }
}