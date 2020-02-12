var fs = require('fs');
var fileToSave = 'security.json';
var IMGModel = {};
var IMGCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(IMGCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  IMGCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var IMGTemplate = {
    Id:'',
    Tittle:"",
    URL_imagen:"",
    thumbnailUrl:"",
    album: ""
}

openFile();

IMGModel.getAll = ()=>{
  return IMGCollection;
}

IMGModel.getById = (id)=>{
  var filteredIMG = IMGCollection.filter(
    (o)=>{
      return o.Id === id;
    }
  );
  if(filteredIMG.length){
    return filteredIMG[0];
  }else{
    return null
  }
}

IMGModel.addNew = ({ titulo, urlIMG, thumbnailUrlIMG, AlbumIMG }  )=>{
  var newIMG = Object.assign(
    {},
    IMGTemplate,
    {  
        Tittle: titulo,
        URL_imagen: urlIMG,
        thumbnailUrl: thumbnailUrlIMG,
        album: AlbumIMG,
        IMGDateCreated: new Date().getTime()
    }
  );
  newIMG.IMGID = IMGCollection.length + 1;

  IMGCollection.push(newIMG);
  writeToFile();
  return newIMG;
}


IMGModel.deleteByCode = (id)=>{
  var newCollection = [];
  newCollection = IMGCollection.filter(
    (o)=>{
      return o.ID !== id;
    }
  );
  IMGCollection = newCollection;
  writeToFile();
  return true;
}

IMGModel.update = (id, { titulo, urlIMG, thumbnailUrlIMG, AlbumIMG })=>{
    var updatingIMG = IMGCollection.filter(
      (o, i)=>{
        return o.ID === id;
      }
    );
    if(updatingIMG && updatingIMG.length>0){
      updatingIMG = updatingIMG[0];
    } else {
      return null;
    }
    var updateIMG = {};
    var newUpdatedCollection = IMGCollection.map(
      (o, i)=>{
        if(o.ID === id){
          updateIMG = Object.assign({},
             o,
            { Tittle: titulo, URL_imagen:urlIMG, thumbnailUrl: thumbnailUrlIMG, album: AlbumIMG,}
          );
          return updateIMG;
        }else{
          return o;
        }
      }
    );
     IMGCollection = newUpdatedCollection;
     writeToFile();
     return updateIMG;
   }

module.exports = IMGModel;