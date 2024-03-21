const category = require("../controllers/category.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

module.exports =(app)=> {
    app.post("/ecomm/api/v1/category",[authMiddleware.verifyToken, authMiddleware.isAdmin],category.createCategory);
}