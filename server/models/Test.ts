import mongoose from "../config/mongoose"

const testSchema = new mongoose.Schema({
    text: {
        required: true,
        type: String
    }
})

const testModel = mongoose.model("Test", testSchema);

export default testModel;