const Express = require('express');
const Router = Express.Router();
const UserController = require(`./controllers/users`);
const ProductController = require(`./controllers/products`);
const ReviewController = require(`./controllers/Reviews`);
const ReplyController = require(`./controllers/Replies`);


//User Controller
Router.get('/', UserController.index);
Router.get('/login', UserController.login);
Router.get('/register', UserController.register);
Router.get('/logoff', UserController.logoff);
Router.get('/users/edit', UserController.edit);
Router.post('/login/validate', UserController.process_login);
Router.post('/register/validate', UserController.process_register);
Router.post('/users/modify/info', UserController.modify_info);
Router.post('/users/modify/password', UserController.modify_password);

//Dashboard Controller
Router.get('/dashboard/admin', ProductController.admin_dashboard);
Router.get('/dashboard', ProductController.dashboard);
Router.get('/products/new', ProductController.new);
Router.get('/products/edit/:id', ProductController.edit);
Router.get('/products/delete/:id', ProductController.delete);
Router.get('/products/show/:id', ProductController.show);
Router.post('/products/add', ProductController.add);
Router.post('/products/modify', ProductController.modify);

//Review Controller
Router.post('/reviews/add', ReviewController.add);

//replies Controller
Router.post('/replies/add', ReplyController.add);


//module.exports to be required in app.js

/* Things to do for this assignment
    Users Model and Controller
    1. Render login page. DONE!!!
    2. Render register page DONE!!!
    3. Register Process. DONE!!!
    4. Login Process DONE!!!
    5. Edit User --- Skip for later and proceed to admin-dashboard.

    Dashboard
    1. Render Admin Dashboard DONE!
    2. Admin Product Add DONE!
    3. Admin Product Edit DONE!
    4. Admin Product Delete DONE!

    Show
    1. Render each product DONE!
    2. add review DONE!
    3. show reviews per product DONE!!!
    4. add replies DONE!!!
    5. show replies. DONE!!!



*/
module.exports = Router;
