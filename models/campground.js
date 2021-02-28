const mongoose = require('mongoose')
const schema = mongoose.Schema
const Review = require('../models/review');

const campGroundSchema = new schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    image:String,
    author:{
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type:schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});
campGroundSchema.post('findOneAndDelete',async function (doc) {
   console.log('hi')
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
    console.log('bye')
})
module.exports = mongoose.model('Campground',campGroundSchema);