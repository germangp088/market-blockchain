import * as mongoose from "mongoose";

const sUser = new mongoose.Schema({
    userName: { type : String , unique : true, required : true, dropDups: true },
    name: {
      firstName: String,
      lastName: String
    },
    created: { 
        type: Date,
        default: Date.now
    }
});

const userSchema = mongoose.model('user', sUser);

export default userSchema;