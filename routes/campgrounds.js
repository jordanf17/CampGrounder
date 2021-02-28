const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const joi =  require('joi');
const {isLoggedIn , isAuthor ,validateCampground} = require('../middleware')
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});
const hello = () => {console.log('hello')}
const campground = require('../models/campground');

router.route('/')
.get(catchAsync(campgrounds.index))
.post(isLoggedIn,validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
.get(catchAsync(campgrounds.showCampground))
.put(isLoggedIn,isAuthor,catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm))

router.use((err,req,res,next) => {
    const {statusCode=500} = err;
    if(!err.messege) err.messege = 'Oh no,Something went wrong'
    res.status(statusCode).render('error',{err});
    
})
module.exports = router;





