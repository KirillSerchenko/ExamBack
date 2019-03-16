const express = require('express');
const router = express.Router();
const dbService = require('../dbService/dbService')
let myService;

router.use(async(req,res,next)=>{
  if(myService === undefined){
    myService = new dbService()
    await myService.initDB()
  }
  next()
})

/* GET All SERVERS. */
router.get('/',async function(req, res) {
  const result = await myService.getAll('servers')
  res.status(200).send(result);
});

/*GET SERVER BY ID. */
router.get('/:uid',async function(req, res) {
  const result = await myService.getById(req.params.uid,'servers')
  res.status(200).send(result);
});

//TODO: use nested routing for that
/*GET Service Status.*/
router.get('/:uid/service/:serviceName/isAlive',async function(req, res) {
 //Query to find isAlive Process of some service.
});


/* POST Some SERVER */
router.post('/',async function(req, res) {
  const result = await myService.insertOne(req.body,'servers')
  res.status(200).send({msg:"User succefully added!",date:new Date()});
});


/*PATCH*/
router.patch('/:uid',async function(req,res){
  const result = await myService.updateStatus(req.params.uid,req.body.status,'servers')
  res.status(200).send(result);
})

module.exports = router;
