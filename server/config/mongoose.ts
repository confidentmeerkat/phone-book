import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/phonebook');

export default mongoose;