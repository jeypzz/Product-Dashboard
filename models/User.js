const Validator = require('../libraries/form_validator');
const Mysql = require('../libraries/mysql');
const Crypto = require('crypto');
const xssFilters = require('xss-filters');

class User{
    async get_user_by_id(id){
        let query = `SELECT * FROM users WHERE id = ?`;
        let values = [id];
        return await Mysql.execute_query(query, values);
    }

    async get_user_by_email(email){
        xssFilters.inHTMLData(email);
        let query = `SELECT * FROM users WHERE email = ?`;
        let values = [email];
        let result = await Mysql.execute_query(query, values);
        return result;
    }

    validate_password_match(user_password, password){
        xssFilters.inHTMLData(user_password);
        xssFilters.inHTMLData(password);
        let hash_password = Crypto.createHash('md5').update(password).digest('hex');
        if(user_password == hash_password){
            return "success";
        }
        else{
            return "Incorrect Email/Password";
        }
    }

    validate_login(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }

        Validator.required(data.email, 'Email');
        Validator.required(data.password, 'Password');
        
        if(!Validator.has_errors()){
            let errors = Validator.validation_errors();
            return errors;
        }
    }
    
    async validate_registration(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        Validator.alpha(data.first_name, 'First Name');
        Validator.alpha(data.last_name, 'Last Name');
        Validator.required(data.first_name, 'First Name');
        Validator.required(data.last_name, 'Last Name');
        Validator.required(data.email, 'Email');
        Validator.required(data.password, 'Password');
        Validator.validate_email(data.email);
        Validator.match(data.password,data.confirm_password);
        Validator.min_length(data.password, 5)
        let email = await this.get_user_by_email(data.email)
        let length = Object.keys(email).length;

        if(!Validator.has_errors()){
            let errors = Validator.validation_errors();
            if(length !== 0){
                errors += "<p>Email already Existing</p>"
            }
            return errors;
        }
        else if(length !== 0){
            return "<p>Email already Existing</p>";
        }
    }

    create_user(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        let query = `INSERT INTO users(users.first_name, users.last_name, users.email, users.password, users.user_level, users.created_at, users.updated_at) 
            VALUES (?,?,?,?,?,?,?)`;
        let hash_password = Crypto.createHash('md5').update(data.password).digest('hex');
        let values = [data.first_name, data.last_name, data.email, hash_password, 1, new Date(), new Date()];
        Mysql.execute_query(query, values);
    }

    async validate_info_edit(post, current_email){
        Validator.alpha(post.first_name, 'First Name');
        Validator.alpha(post.last_name, 'Last Name');
        Validator.required(post.first_name, 'First Name');
        Validator.required(post.last_name, 'Last Name');
        Validator.required(post.email, 'Email');
        let database_email = await this.get_user_by_email(post.email); 
        let length = Object.keys(database_email).length;
        if(!Validator.has_errors()){
            let errors = Validator.validation_errors();
            return errors;
        }
        else if(post.email === current_email){
            return null;
        }
        else if(length !== 0){
            return "<p>Email already Existing</p>";
        }
    }

    async validate_password_edit(post, current_password){
        for(let key in post){
            xssFilters.inHTMLData(post[key]);
        }

        Validator.required(post.old_password, 'Old Password');
        Validator.required(post.new_password, 'Password');
        Validator.required(post.confirm_password, 'confirm_password');
        Validator.match(post.new_password, post.confirm_password);
        
        if(!Validator.has_errors()){
            let errors = Validator.validation_errors();
            return errors;
        }
        else if(this.validate_password_match(current_password, post.old_password) != "success"){
            return "Wrong Password";
        }
    }

    async update_user(data){
        let query = "UPDATE users SET first_name = ?, last_name = ?, email = ?, updated_at = ? WHERE users.id = ?";
        let values = [data.first_name, data.last_name, data.email, new Date(), data.id];
        return await Mysql.execute_query(query, values);
    }

    async update_password(data){
        let query = "UPDATE users SET password = ?, updated_at = ? WHERE users.id = ?";
        let hash_password = Crypto.createHash('md5').update(data.new_password).digest('hex');
        let values = [hash_password, new Date(), data.id];
        return await Mysql.execute_query(query, values);
    }
}

//module.exports to be required in routes.js
module.exports = new User;