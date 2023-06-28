import mongoose from 'mongoose';

export interface ICard {
  name: string;
  link: string;
 
  }

const cardSchema = new mongoose.Schema<ICard>({
    name:{
        type: String,
        minlength: 2,
        maxlength: 30
    },
    link: {
        type: String,
        required: true,
    },
    
});

export default mongoose.model('card', cardSchema); 