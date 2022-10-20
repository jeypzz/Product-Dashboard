const Validator = require('../libraries/form_validator');
const Mysql = require('../libraries/mysql');
const Crypto = require('crypto');
const xssFilters = require('xss-filters');

class Review{
    
    async get_reviews_by_product_id(id){
        let query = `SELECT reviews.id, CONCAT(users.first_name,' ',users.last_name) as full_name, reviews.content, reviews.created_at FROM reviews LEFT JOIN users ON reviews.user_id = users.id LEFT JOIN products ON reviews.product_id = products.id WHERE product_id = ? ORDER BY 4 DESC`;
        let values = [id]
        return await Mysql.execute_query(query, values);
    }

    async create_review(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        let query = "INSERT INTO Reviews(user_id, product_id, content, created_at, updated_at) VALUES (?,?,?,?,?)";
        let values = [data.user_id, data.product_id, data.review_content, new Date(), new Date()];
        await Mysql.execute_query(query, values);
    }

    async validate_review(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        Validator.required(data.review_content, 'Review');

        if(!Validator.has_errors()){
            let errors = Validator.validation_errors();
            return errors;
        }
    }
}



//module.exports to be required in routes.js
module.exports = new Review;