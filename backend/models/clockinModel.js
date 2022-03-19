const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const clockinSchema = new mongoose.Schema({
    clockedInAt: { type: Date },
    staff: { type: ObjectId, ref: 'Staff' },
    clockedIn: {type:Boolean, default:false},
    clockedOut: {type:Boolean, default:false}
})

const Clockin = mongoose.model('Clockin', clockinSchema)
module.exports = Clockin