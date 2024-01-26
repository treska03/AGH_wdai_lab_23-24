const express = require('express')
const router = express.Router()
const {PersonSchema} = require('./db.js')

// Czy da się to zrobić bez wrzucania wszędzie await?

router.get('/person/all', async (req, res) => {
  const all = await PersonSchema.findAll();
  res.send(all);
})

router.get('/person/get', async (req, res) => {
  const person = await PersonSchema.findByPk(req.query.id);
  res.send(person);
})

router.post('/person/add', async (req, res) => {
  const created =  await PersonSchema.create({'name' : req.query.name, 'surname' : req.query.surname, 'job' : req.query.job});
  res.send(created);
})

router.get('/',(req,res)=>{
  res.send('Hello World!');
})

module.exports = router;