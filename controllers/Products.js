const Product = require('../models/Product');
const Profiler = require('../libraries/profiler');
const Review = require('../models/Review');;
const Reply = require('../models/Reply');;

class Products{

    async admin_dashboard(req, res){
        if(req.session.is_logged_in == true && req.session.user_level == 9){
            let products = await Product.get_all_product();
            let product_sold;
            for(let product of products){
                product_sold = await Product.get_sold_by_product_id(product.id);
                product.product_sold = product_sold[0].total_sold != null ? product_sold[0].total_sold : 0;
            }
            res.render('products/admin_dashboard', { products: products });
        }
        else{
            res.redirect('/login');
        }
    }

    async dashboard(req, res){
        if(req.session.is_logged_in == true && req.session.user_level !== 9){
            let products = await Product.get_all_product();
            let product_sold;
            for(let product of products){
                product_sold = await Product.get_sold_by_product_id(product.id);
                product.product_sold = product_sold[0].total_sold != null ? product_sold[0].total_sold : 0;
            }
            res.render('products/dashboard', { products: products });
        }
        else if(req.session.is_logged_in == true && req.session.user_level == 9){
            res.redirect('/dashboard/admin');
        }
        else{
            res.redirect('/login');
        }
    }

    new(req, res){
        if(req.session.is_logged_in == true && req.session.user_level == 9){
            let error_msg = req.flash('error_msg')[0];
            let success_msg = req.flash('success_msg')[0];
            res.render('products/new', { error_msg: error_msg, success_msg: success_msg, csrf_token: req.csrfToken() });
        }
        else{
            res.redirect('/login');
        }
    }

    async edit(req, res){
        if(req.session.is_logged_in == true && req.session.user_level == 9){
            let error_msg = req.flash('error_msg')[0];
            let success_msg = req.flash('success_msg')[0];
            let product = await Product.get_product_by_id(req.params.id);
            res.render('products/edit', { product: product[0], error_msg: error_msg, success_msg: success_msg, csrf_token: req.csrfToken() });
        }
        else{
            res.redirect('/login');
        }
    }

    async add(req, res){
        let result = await Product.validate_product(req.body);

        if(result == null){
            let data = req.body;
            data.user_id = req.session.user_id;
            Product.create_product(data);
            req.flash('success_msg', "<p>Product succesfully added!</p>");
            res.redirect('/dashboard/admin');
        }
        else{
            req.flash('error_msg', result);
            res.redirect('/products/new');
        }
    }

    async modify(req, res){
        let result = await Product.validate_product(req.body);

        if(result == null){
            let data = req.body;
            data.user_id = req.session.user_id;
            Product.edit_product(data);
            req.flash('success_msg', "<p>Product succesfully modified!</p>");
            res.redirect('/dashboard/admin');
        }
        else{
            req.flash('error_msg', result);
            res.redirect('/products/edit/' + req.body.id);
        }
    }

    async delete(req, res){
        Product.delete_product(req.params.id);
        res.redirect('/dashboard/admin');
    }

    async show(req, res){
        if(req.session.is_logged_in == true){
            let error_msg = req.flash('error_msg')[0];
            let success_msg = req.flash('success_msg')[0];
            let product = await Product.get_product_by_id(req.params.id);
            let product_sold = await Product.get_sold_by_product_id(req.params.id);
            product[0].product_sold = product_sold[0].total_sold != null ? product_sold[0].total_sold : 0;
            product[0].created_at = new Date(product[0].created_at).toLocaleString("default",{month: 'long'}) + " " + product[0].created_at.getDate() + ", " + product[0].created_at.getFullYear();
            let reviews = await Review.get_reviews_by_product_id(req.params.id);
            
            for(let review of reviews){
                review.created_at = new Date(review.created_at).toLocaleString("default",{month: 'long'}) + " " + review.created_at.getDate() + ", " + review.created_at.getFullYear();
                review.replies = await Reply.get_replies_by_product_id(review.id);
                for(let reply of review.replies){
                    reply.created_at = new Date(reply.created_at).toLocaleString("default",{month: 'long'}) + " " + reply.created_at.getDate() + ", " + reply.created_at.getFullYear();
                } 
            }
            res.render('products/show', { product: product[0], reviews: reviews, error_msg: error_msg, success_msg: success_msg, csrf_token: req.csrfToken() });
        }
        else{
            res.redirect('/login');
        }
    }

}

module.exports = new Products;