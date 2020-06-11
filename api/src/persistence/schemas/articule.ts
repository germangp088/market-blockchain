import * as mongoose from "mongoose";

const sArticule = new mongoose.Schema({
    _user : { type: String, ref: 'user' },
    name: { type : String , required : true},
    description: String,
    price: Number,
    created: { 
        type: Date,
        default: Date.now
    }
});

const articuleSchema = mongoose.model('articule', sArticule);

export default articuleSchema;