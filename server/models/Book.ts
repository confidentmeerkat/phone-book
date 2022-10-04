import mongoose from "../config/mongoose"

const bookSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: String
    }
})

const bookModel = mongoose.model("Book", bookSchema)

export default bookModel