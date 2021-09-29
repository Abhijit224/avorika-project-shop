var router = require('express').Router();

router.get('/',(req,res)=>{
  res.send("you are in ")
})


module.exports = router;
