const express = require('express');
const { ConnectionStates } = require('mongoose');
const user = require('../models/tracker')
const router = express.Router();

router.get('/users', (req, res) => {
  user.find({})
    .exec((err, users) => {
      if (err) next(new Error(err))
      // res.json(users)
      const reply = users.map((item) => ({ username: item.username, _id: item._id }))
      res.json(reply)
    })
})
router.get('/users/:_id/logs', (req, res) => {

  user.findOne({ _id: req.params._id })
    .exec((err, data) => {

      const count = data.logs.length;

      var newData = data.logs.map(item => {
        return {
          description: item.description,
          duration: Number(item.duration),
          date: new Date(item.date).toDateString()
        }

      });
      if (req.query.limit) {
        const lg = newData.slice(0, Number(req.query.limit))
        var replyData = Object.assign({ _id: data._id, username: data.username, count: count }, { log: lg })
        res.json(replyData)
         
      } 
      //start of time
      
else if (req.query.from || req.query.to) {
const lg = newData.filter((log) =>{ return ( new Date(log.date) >=new Date(req.query.from) &&  new Date(log.date) <= new Date(req.query.to))})
   var replyData = Object.assign({ _id: data._id, username: data.username, count: count }, { log: lg })
  res.json(replyData)
      } //end oftime 
    else {
      var replyData = Object.assign({ _id: data._id, username: data.username, count: count }, { log: newData })
      res.json(replyData)
    }
    })
})







  
module.exports = router;