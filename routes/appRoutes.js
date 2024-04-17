const { Router } = require('express');
const appController = require('../controllers/appController');

const router = Router();

router.get('/', appController.home_get);
router.post('/addmeter', appController.addmeter_post);
router.post('/purchasetokens', appController.purchasetokens_post);
// router.post('/login', authController.login_post);

module.exports = router;
