const { Router } = require('express');
const authcontroller = require('../controllers/appController');

const router = Router();

router.get('/', appController.home_get);
router.post('/addmeter', appcontroller.signup_post);
router.post('/purchasetokens', appcontroller.login_get);
router.post('/login', authcontroller.login_post);

module.exports = router;
