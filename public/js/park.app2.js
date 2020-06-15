var map2;

function initMap() {

    //Optiuni harta
    var options = {
        zoom:14,
        center:{lat:45.6580, lng:25.6012}
    }
    // Harta noua
    map2 = new google.maps.Map(document.getElementById('map2'), options);
    // Geocoder nou
    var geocoder = new google.maps.Geocoder();

    document.getElementById('trimite').addEventListener('click', function(){
        geocodeAdress(geocoder, map2);
    });
}

function geocodeAdress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status){
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Localizarea Geocode nu a avut succes din cauza urmatorului motiv: ' + status);
        }
    });
}