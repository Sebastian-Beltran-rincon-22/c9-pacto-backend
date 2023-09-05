const express = require('express')

const controllerUser = require('../controllers/user')

const router = express.Router()
const authJwt = require('../middlewares/authJwt')
const verifySignup = require('../middlewares/verifySignup')


router.post('/create',[ authJwt.verifyToken,authJwt.isAdmin,verifySignup.checkRoleExist,verifySignup.checkDupletUserNameOrEmail
],controllerUser.create)


router.get('/', controllerUser.getUser)
router.get('/:id', controllerUser.getUserById)
router.patch('/update/:id', controllerUser.updateUser)
router.delete('/delete/:id',[ authJwt.verifyToken,authJwt.isAdmin,verifySignup.checkRoleExist
], controllerUser.deleteUser)

module.exports = router
