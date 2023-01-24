const express = require('express');
const { ConnectionStates } = require('mongoose');
const user = require('../models/tracker')
const router = express.Router();



router.post('/api/users', async (req, res) => {
  user.create({ username: req.body.username }, (err, data) => {
    res.json({ status: "success", username: data.username, _id: data._id })
  })
})
router.post('/api/users/:_id/exercises', async (req, res) => {
  let d1 = new Date(req.body.date)
  if (d1 == 'Invalid Date') {
    d1 = new Date();
  }
  const d2 = d1.toDateString;
  const Obj = {
    description: req.body.description,
    duration:Number(req.body.duration),
    date: d1
  }

  const data = await user.findOne({ _id: req.params._id });
  data.count++;
  data.logs.push(Obj);
  data.save();
  //res.json(data)
  res.json({username:data.username,description:req.body.description,date:d1.toDateString(),duration:Number(req.body.duration),_id:data._id})
})
router.post('/api/users/:_id/exercises',(req,res)=>{
  
})

module.exports = router;