function onSend(){

  var refUrl=document.getElementById('in').value;

  var elem = document.getElementById('content');
  elem.innerHTML = `<b>En cours de chargement de ${refUrl}...`;

var url='https://api.allorigins.win/get?url=' + encodeURIComponent(refUrl);
  const req = new XMLHttpRequest();
  req.addEventListener("load", onReceive);
  req.open("GET", url);
  req.send();
  return false;
}


function onReceive() {
  var content = JSON.parse(this.responseText).contents;
  var regexp = /.*>([^<>]+)<!-- gid (\d+) ([^<> ]+) -->/gm;

  var elem = document.getElementById('content');
  elem.innerHTML = '';

  while ((array1 = regexp.exec(content)) !== null) {
    [match, doc, id, fileName] = array1;
  elem.innerHTML += `<a href="https://www.ipdb.org/files/${id}/${fileName}">${doc} (${fileName})</a><br>`
  console.log(`Found ${array1[0]}. Next starts at ${regexp.lastIndex}.`);
  }

  if(elem.innerHTML === ''){
    elem.innerHTML = 'Aucun document trouvé!'
  }
}