import mongoose from "../config/mongoose"

const phoneSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: String
    }
})

const phoneModel = mongoose.model("Phone", phoneSchema)

export default phoneModel