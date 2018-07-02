const router = require('express').Router()
const {Room} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Room.findAll()
    .then(allRooms => res.send(allRooms))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Room.create(req.body)
    .then(newRoom => res.send(newRoom))
    .catch(next)
})

// router.put('/', (req, res, next) => {
//     Room.findOrCreate(req.body)
//     .then()
// })
