import mongoose from 'mongoose';

const bookDeadlineSchema = new mongoose.Schema({
  /**
   * The unique, numeric identifier of the book deadline.
   */
  _id: Number,
  /**
   * The date of the book deadline.
   */
  date: Date,
});

export default mongoose.model('BookDeadline', bookDeadlineSchema);
