import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: new mongoose.Types.ObjectId(),
    name: {
      firstName: String,
    lastName: String
    },
    created: Date
});


const sUser = mongoose.model('user', userSchema);

export default sUser;