const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const clockinSchema = new mongoose.Schema({
    staff: { type: ObjectId, ref: 'Staff' },
    staffId: {type:String},
    clockedIn: {type:Boolean, default:false},
}, {timestamps:true})

const Clockin = mongoose.model('Clockin', clockinSchema)
module.exports = Clockin