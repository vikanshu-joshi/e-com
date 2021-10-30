const mongoose = require("mongoose");
const TABLES = require("../variables/tables");

const schema = new mongoose.Schema({
    product_id: {
        type:String
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model(TABLES.PRODUCT_HISTORY, schema)
