import mongoose from "../config/mongoose"

const contactSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: String
    }
})

const contactModel = mongoose.model("Contact", contactSchema)

export default contactModel