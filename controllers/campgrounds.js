const campground = require('../models/campground')

module.exports.index = async (req, res) => {
    const acampgrounds = await campground.find({});
    res.render('campgrounds/index', { acampgrounds })
}
module.exports.renderNewForm = (req,res) => {
    res.render('campgrounds/new');
}
module.exports.createCampground  = async (req, res, next) => {
    const acampground = new campground(req.body.campground);
    acampground.author = req.user._id;
    await acampground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${acampground._id}`)
}
module.exports.showCampground = async (req,res) => {
    const acampground = await (await campground.findById(req.params.id).populate({
        path:'reviews',
        populate: {
            path:'author'
        }
    }).populate('author'));
    if (!acampground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{acampground})
}
module.exports.renderEditForm = async (req,res) => {
    const { id } = req.params;
    const acampground = await campground.findById(id)
    if (!acampground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{acampground})
}
module.exports.updateCampground = async (req,res) => {
    const {id} = req.params
    const acampground = await campground.findByIdAndUpdate(id,{ ...req.body.campground})
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${acampground._id}`);
}
module.exports.deleteCampground = async (req,res) => {
    const {id} = req.params;
    await campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}