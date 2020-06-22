if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

export default {
    port: process.env.PORT || 3000,
    mongo: {
        host: {
            URI: process.env.MONGO_URI,
            host: process.env.MONGO_HOST,
            database: "market-blockchain",
            port: process.env.MONGO_PORT || 27017
        }
    },
    ganache: {
        host: `http://${process.env.GANACHE_HOST}:${process.env.GANACHE_PORT}`
    }
}