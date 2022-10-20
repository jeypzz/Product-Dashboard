const Validator = require('../libraries/form_validator');
const Mysql = require('../libraries/mysql');
const Crypto = require('crypto');
const xssFilters = require('xss-filters');

class Reply{
    
    async get_replies_by_product_id(id){
        let query = `SELECT replies.id, CONCAT(users.first_name,' ',users.last_name) as full_name, replies.content, replies.created_at FROM replies LEFT JOIN reviews ON replies.review_id = reviews.id LEFT JOIN users ON replies.user_id = users.id WHERE review_id = ?`;
        let values = [id]
        return await Mysql.execute_query(query, values);
    }

    async create_reply(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        let query = "INSERT INTO replies(user_id, review_id, content, created_at, updated_at) VALUES (?,?,?,?,?)";
        let values = [data.user_id, data.review_id, data.reply_content, new Date(), new Date()];
        await Mysql.execute_query(query, values);
    }

    async validate_reply(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        Validator.required(data.reply_content, 'Reply');

        if(!Validator.has_errors()){
            let errors = Validator.validation_errors();
            return errors;
        }
    }
}



//module.exports to be required in routes.js
module.exports = new Reply;