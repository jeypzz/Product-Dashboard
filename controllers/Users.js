const User = require('../models/User');
const Profiler = require('../libraries/profiler');

class Users{

    index(req, res){
        res.redirect('/login');
    }

    login(req, res){
        if(req.session.is_logged_in !== true){
            let error_login = req.flash('error_login')[0];
            let success_msg = req.flash('success_msg')[0];
            res.render('users/login', { error_login: error_login, success_msg, success_msg, csrf_token: req.csrfToken() });
        }
        else{
            res.redirect('/dashboard');
        }
    }

    register(req, res){
        if(req.session.is_logged_in !== true){
            let error_registration = req.flash('error_registration')[0];
            res.render('users/register', { error_registration: error_registration, csrf_token: req.csrfToken() });
        }
        else{
            res.redirect('/dashboard');
        }
    }

    async edit(req, res){
        if(req.session.is_logged_in){
            let user = await User.get_user_by_id(req.session.user_id);
            let info_msg = [req.flash('error_info_msg')[0], req.flash('success_info_msg')[0]]
            let password_msg = [req.flash('error_password_msg')[0], req.flash('success_password_msg')[0]]
            res.render('Users/edit', { user: user[0], info_msg: info_msg, password_msg: password_msg,  csrf_token: req.csrfToken() });
        }
        else{
            res.redirect('/');
        }
    }

    async modify_info(req, res){
        let user = await User.get_user_by_id(req.session.user_id);
        let result = await User.validate_info_edit(req.body, user[0].email);

        if(result == null){
            User.update_user(req.body);
            req.flash('success_info_msg', '<p>Info Updated Successful</p>');
            res.redirect('/users/edit');
        }
        else{
            req.flash('error_info_msg', result);
            res.redirect('/users/edit');
        }
    }

    async modify_password(req, res){
        let user = await User.get_user_by_id(req.session.user_id);
        let result = await User.validate_password_edit(req.body, user[0].password);

        if(result == null){
            User.update_password(req.body);
            req.flash('success_password_msg', '<p>Password Updated Successful</p>');
            res.redirect('/users/edit');
        }
        else{
            req.flash('error_password_msg', result);
            res.redirect('/users/edit');
        }
    }

    async process_login(req, res){        
        let result = User.validate_login(req.body);
        
        if(result == null){
            let user = await User.get_user_by_email(req.body.email);
            let password = user.length !== 0 ? user[0].password : "";
            result = User.validate_password_match(password, req.body.password);
            
            if(result == "success"){
                req.session.user_id = user[0].id;
                req.session.is_logged_in = true;
                req.session.user_level = user[0].user_level;
                if(req.session.user_level == 9){
                    res.redirect('/dashboard/admin');
                }
                else{
                    res.redirect('/dashboard');
                }
            }
            else{
                req.flash('error_login', result);
                res.redirect('/');
            }
        }
        else{
            req.flash('error_login', result);
            res.redirect('/');
        }
    }

    async process_register(req, res){
        let result = await User.validate_registration(req.body);

        if(result == null){
            User.create_user(req.body);
            let user = await User.get_user_by_email(req.body.email);
            req.flash('success_msg', '<p>Registration Successful</p>');
            req.session.user_id = user[0].id;
            req.session.is_logged_in = true;
            res.redirect('/');
        }
        else{
            req.flash('error_registration', result);
            res.redirect('/register');
        }
    }

    logoff(req, res){
        req.session.destroy();
        res.redirect('/');
    }
}
//module.exports to be required in routes.js
module.exports = new Users;