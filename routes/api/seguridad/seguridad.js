var express =  require('express');
var router = express.Router();
var IMGModel = require('./seguridad.model');

router.get('/IMG/all', (req, res)=>{
    return res.status(200).json(IMGModel.getAll());
} ); 

router.get('/IMG/:id',(req, res)=>{
    var id = parseInt( req.params.id );
    var IMG = IMGModel.getById(id);
    return res.status(200).json(IMG);
});

router.post('/IMG/new', (req, res)=>{
  var datosEnviados = req.body;
  var newIMG = IMGModel.addNew(datosEnviados);
  return res.status(200).json(newIMG);
}); 

router.put('/IMG/upd/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  var updIMG = IMGModel.update( id, req.body);
  return res.status(200).json(updIMG);
});

router.delete('/IMG/del/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  IMGModel.deleteByCode(id);
  res.status(200).json({"deleted":true});
});

module.exports = router;
