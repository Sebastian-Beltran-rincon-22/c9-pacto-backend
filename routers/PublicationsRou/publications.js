const express = require('express')
const authJwt = require('../../middlewares/authJwt')
const controllerPublication = require('../../controllers/publicationsControllers/publications')


const router = express.Router()

//rutas 
//crear publicación
router.post('/create', controllerPublication.create)

//buscarpublicaciones
router.get('/', controllerPublication.getPublication)

//publicaiones por ID
router.get('/:id', controllerPublication.getPublicationById)

//actualizar la publicación
router.patch('/update/:id', authJwt.verifyToken, controllerPublication.updatePublication)

//eliminar publicación
router.delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controllerPublication.deletePublication)

// Dar like a una publicación
router.post('/:id/like', controllerPublication.likePublication);

// Quitar like a una publicación
router.delete('/:id/unlike', controllerPublication.unlikePublication);


// Nueva ruta para obtener los likes de un usuario específico
router.get('/users/:userId/likes', controllerPublication.getLikesForUser);

module.exports = router

