import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const sUser = new mongoose.Schema({
    userName: { type : String , unique : true, required : true, dropDups: true },
    privateKey: String,
    name: {
      firstName: String,
      lastName: String
    },
    articules: [{
        type: Schema.Types.ObjectId,
        ref: 'articules'
    }],
    created: { 
        type: Date,
        default: Date.now
    }
});

const userSchema = mongoose.model('user', sUser);

export default userSchema;