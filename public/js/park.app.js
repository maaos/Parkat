
////////////////////////
////////////////////////

var map, infoWindow;

// HARTA SEARCH 
function initMap() {

  // Optiuni Harta
var options = {
  zoom:14,
  center:{lat:45.6580, lng:25.6012}
 }

 // Harta noi
 map = new google.maps.Map(document.getElementById('map'), options);

// Creaza Fereastra Info
 infoWindow = new google.maps.InfoWindow;
  
 //HTML5 Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
      
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found. ');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    //Browserul nu suporta Geolocatie
    handleLocationError(false,infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Eroare: Serviciul de Geolocalizare a esuat':
                          'Eroare: Navigatorul utilizat nu suporta Geolocalizarea');
    infoWindow.open(map);
  }
  


  // Asculta pentru click pe harta
  google.maps.event.addListener(map, 'click', function(event){
   // Adauga marker
   addMarker({coords:event.latLng});
  });

  /*
  // Adauga marker cod initial
   var marker = new google.maps.Marker({
   position:{lat:42.4668,lng:-70.9495},
   map:map,
   icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });

   var infoWindow = new google.maps.InfoWindow({
   content:'<h1>Lynn MA</h1>'
   });

  marker.addListener('click', function(){
  infoWindow.open(map, marker);
  });
  */

  // Array markere
  var markers = [
    {
      coords:{lat:45.656711,lng:25.614416},
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
      content:
      `
      <h2>Detalii loc 1</h2>
      <ul class="list-group">
      <li class="list-group-item">Status: <strong>OCUPAT</strong>, [utilizat intre 9-11]</li> 
      <li class="list-group-item">Pret: 5lei/h</li> 
      <li class="list-group-item">Disponibil: 9-15</li>
      <li class="list-group-item disabled">
      <form class="form-inline">
      <label class="my-1 mr-2" for="inlineForm">Selecteaza număr ore</label>
      <select class="custom-select mr-sm-2" id="inlineForm">
      <option selected>Alege...</option>
      <option value>1</option>
      <option value>2</option>
      <option value>3</option>
      <select>
      </form>
      </li>
      <li class="list-group-item disabled"> 
      <button class="btn btn-outline-secondary">Rezervă</button>
      </li>
      </ul>
      `
    },
    {
      coords:{lat:45.658570,lng:25.614507},
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
      content:
      `
      <h2>Detalii loc 2</h2>
      <ul class="list-group">
      <li class="list-group-item">Status: <strong>LIBER</strong></li> 
      <li class="list-group-item">Pret: 3lei/h</li> 
      <li class="list-group-item">Disponibil: 8-17</li>
      <li class="list-group-item">
      <form class="form-inline">
      <label class="my-1 mr-2" for="inlineForm">Selectează număr ore</label>
      <select class="custom-select mr-sm-2" id="inlineForm">
      <option selected>Alege...</option>
      <option value>1</option>
      <option value>2</option>
      <option value>3</option>
      <select>
      </form>
      </li>
      <li class="list-group-item"> 
      <button class="btn btn-outline-secondary">Rezervă</button>
      </li>
      </ul>
      `
    
    },
    {
      coords:{lat:45.661742,lng:25.605699},
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
      content:
      `
      <h2>Detalii loc 3</h2>
      <ul class="list-group">
      <li class="list-group-item" id="status">Status: <strong>LIBER</strong></li> 
      <li class="list-group-item">Pret: 0lei/h</li> 
      <li class="list-group-item">Disponibil: 10-16</li>
      <li class="list-group-item info">
      <form class="form-inline">
      <label class="my-1 mr-2" for="inlineForm">Selectează număr ore</label>
      <select class="custom-select mr-sm-2" id="inlineForm">
      <option selected>Alege...</option>
      <option value>1</option>
      <option value>2</option>
      <option value>3</option>
      <select>
      </form>
      </li>
      <li class="list-group-item"> 
      <button class="btn btn-outline-secondary">Rezervă</button>
      </li>
      </ul>
      `
    }
  ];

  /*   <ul class="list-group">
        <li class="list-group-item"><strong>Latitudine</strong>: ${lat}</li>
        <li class="list-group-item"><strong>Longitudine</strong>: ${lng}</li>
      </ul>
      */

  // Bucla prin markere
  for(var i = 0;i < markers.length;i++){
  // Adauga marker
  addMarker(markers[i]);
  }

  // Functie Adaugare Marker
  function addMarker(props){
   var marker = new google.maps.Marker({
    position:props.coords,
    map:map,
    //icon:props.iconImage
  });

  // Verifica pentru icon custom
  if(props.iconImage){
   // Seteaza icon
   marker.setIcon(props.iconImage);
  }

  // Verifica continut
  if(props.content){
   var infoWindow = new google.maps.InfoWindow({
   content:props.content
  });

  marker.addListener('click', function(){
   infoWindow.open(map, marker);
   });
  }
 }  
}



$(document).ready(function(){

$('#buton-cautare1').on('click', function(){
    window.location.href='http://localhost:3002/search';
});

$('#logolog').on('click', function(){
  window.location.href='http://localhost:3002/';
});

//Schimba clasa itemelor in lista de informatii loc parcare atunci cand
//acesta are un statusul OCUPAT

// din cauza ca a existat la crearea clasei "OCUPAT"
//chit ca schimb textu in "LIBER" acele selectoare cheie raman disbled
/*INCERCARE 3

if($(".list-group-item:contains('OCUPAT')" == "OCUPAT")) { 
  $("#detalii").addClass("disabled");

}

/*INCERCARE 2

if($('li:contains("OCUPAT")')) {
  $(".list-group-item").addClass("disabled");

} else {
  $(".list-group-item").removeClass("disabled");

}

//INCERCARE 1
/*if ($("#status").text === "OCUPAT") {
  $(".list-group-item").addClass("disabled");
} */





});




// INCERCARE GEOCODE V1
/*
// Geocode

//Call Geocode
//geocode();

// Get location form
var locationForm = document.getElementById('form-locatie');

// Listen for submiot
locationForm.addEventListener('submit', geocode);

function geocode(e){
  // Prevent actual submit
  e.preventDefault();

  var location = document.getElementById('input-locatie').value;

  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:location,
      key:'AIzaSyCFhWyCY0F0ruPSVIaBh4dsk9vDoAmPqzw'
    }
  })
  .then(function(response){
    // Log full response
    console.log(response);

    // Formatted Address
    var formattedAddress = response.data.results[0].formatted_address;
    var formattedAddressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul>
    `;

    // Address Components
    var addressComponents = response.data.results[0].address_components;
    var addressComponentsOutput = '<ul class="list-group">';
    for(var i = 0;i < addressComponents.length;i++){
      addressComponentsOutput += `
        <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
      `;
    }
    addressComponentsOutput += '</ul>';

    // Geometry
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var geometryOutput = `
      <ul class="list-group">
        <li class="list-group-item"><strong>Latitudine</strong>: ${lat}</li>
        <li class="list-group-item"><strong>Longitudine</strong>: ${lng}</li>
      </ul>
    `;

    // Output to app
    document.getElementById('adresa-formatata').innerHTML = formattedAddressOutput;
    document.getElementById('componente-adresa').innerHTML = addressComponentsOutput;
    document.getElementById('geometrie').innerHTML = geometryOutput;
  })
  .catch(function(error){
    console.log(error);
  });
}
*/

