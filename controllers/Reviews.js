const Review = require('../models/Review');
const Profiler = require('../libraries/profiler');

class Reviews{

    async add(req, res){
        let result = await Review.validate_review(req.body);

        if(result == null){
            let data = req.body;
            data.user_id = req.session.user_id;
            Review.create_review(data);
            req.flash('success_msg', "<p>Review succesfully added!</p>");
            res.redirect('/products/show/' + req.body.product_id);
        }
        else{
            req.flash('error_msg', result);
            res.redirect('/products/show/' + req.body.product_id);
        }
    }

}

module.exports = new Reviews;