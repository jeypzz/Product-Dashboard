const Validator = require('../libraries/form_validator');
const Mysql = require('../libraries/mysql');
const Crypto = require('crypto');
const xssFilters = require('xss-filters');

class Product{
    
    async get_all_product(){
        let query = `SELECT * FROM products`;
        return await Mysql.execute_query(query);
    }

    async get_sold_by_product_id(id){
        let query = "SELECT SUM(quantity) AS total_sold FROM Orders WHERE product_id = ?";
        let values = [id]
        return await Mysql.execute_query(query, values);
    }

    async get_product_by_id(id){
        let query = "SELECT * FROM Products WHERE id = ?";
        let values = [id]
        return await Mysql.execute_query(query, values);
    }

    async create_product(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        let query = "INSERT INTO Products(user_id, name, description, price, quantity, created_at, updated_at) VALUES (?,?,?,?,?,?,?)";
        let values = [data.user_id, data.name, data.description, data.price, data.quantity, new Date(), new Date()];
        await Mysql.execute_query(query, values);
    }

    async edit_product(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        let query = "UPDATE Products SET name = ?, description = ?, price = ?, quantity = ?, updated_at = ? WHERE id = ?";
        let values = [data.name, data.description, data.price, data.quantity, new Date(), data.id];
        await Mysql.execute_query(query, values);
    }

    async delete_product(id){
        let query = "DELETE FROM Products WHERE id = ?";
        let values = [id];
        await Mysql.execute_query(query, values);
    }

    async validate_product(data){
        for(let key in data){
            xssFilters.inHTMLData(data[key]);
        }
        Validator.required(data.name, 'Name');
        Validator.required(data.description, 'Description');
        Validator.required(data.price, 'Price');
        Validator.required(data.quantity, 'Quantity');

        if(!Validator.has_errors()){
            let errors = Validator.validation_errors();
            return errors;
        }
    }
}

//module.exports to be required in routes.js
module.exports = new Product;