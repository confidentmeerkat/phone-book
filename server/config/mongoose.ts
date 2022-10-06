import mongoose from 'mongoose';

mongoose.connect('mongodb://mongodb_container:27017/phonebook');

export default mongoose;