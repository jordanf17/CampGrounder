const mongoose = require('mongoose')
const campground = require('../models/campground')
const cities = require('./cities');
const { places,descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.then(() =>{
    console.log('MONGO CONNECTION OPEN!!')
})
.catch(err => {
    console.log('oh no mongo error')
    console.log(err);
});
const sample = array =>  array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price= Math.floor(Math.random()*30) +10;
        const camp = new campground({
            author: '60334b8bc5092c6615819a1d',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/2184453',
            description:'lLorem ipsum dolor sit amet consectetur adipisicing elit. Sit deserunt eligendi minus, omnis deleniti accusantium, quia hic laborum expedita excepturi tempora quaerat distinctio. Dolor, atque dolorem alias exercitationem aliquam culpa.',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
