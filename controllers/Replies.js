const Reply = require('../models/Reply');
const Profiler = require('../libraries/profiler');

class Replies{

    async add(req, res){
        let result = await Reply.validate_reply(req.body);

        if(result == null){
            let data = req.body;
            data.user_id = req.session.user_id;
            Reply.create_reply(data);
            req.flash('success_msg', "<p>Reply succesfully added!</p>");
            res.redirect('/products/show/' + req.body.product_id);
        }
        else{
            req.flash('error_msg', result);
            res.redirect('/products/show/' + req.body.product_id);
        }
    }

}

module.exports = new Replies;