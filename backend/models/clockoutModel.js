const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const clockoutSchema = new mongoose.Schema({
    staff: { type: ObjectId, ref: 'Staff' },
    clockedOut: {type:Boolean, default:false}
}, {timestamps:true})

const Clockout = mongoose.model('Clockout', clockoutSchema)
module.exports = Clockout