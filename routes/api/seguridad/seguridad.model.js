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
  var filteredUsers = IMGCollection.filter(
    (o)=>{
      return o.Id === id;
    }
  );
  if(filteredUsers.length){
    return filteredUsers[0];
  }else{
    return null
  }
}

