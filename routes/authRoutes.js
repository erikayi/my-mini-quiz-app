const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)

router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

router.get('/logout', authController.logout_get)

router.get('/sql_test', authController.sql_get)

router.get('/css_test', authController.css_get)

router.get('/html_test', authController.css_get)

router.get('/feedback', authController.feedback_get)
router.put('/feedback', authController.feedback_put)

router.get('/contact', authController.contact_get)
router.put('/contact', authController.contact_put)

router.get('/admin', authController.admin_get)
router.post('/admin', authController.admin_post)



module.exports = router

