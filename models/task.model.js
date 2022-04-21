const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    name: {type: String, required: true, max: 100},
    checked: {type: Boolean, required: true},
    userId:{
        type:String,
        required:true
    }
    
});


// Export the model
module.exports = mongoose.model('items', TaskSchema,);