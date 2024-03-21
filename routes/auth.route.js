const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", [authMiddleware.verifySignup], authController.signup);
    app.post("/ecomm/api/v1/auth/signin",[authMiddleware.verifySignin], authController.signin);
    
}
