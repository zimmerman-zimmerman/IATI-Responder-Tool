// init 
L.mapbox.accessToken = 'pk.eyJ1IjoibWFuc3VyIiwiYSI6ImNpbjAyY2NrNjAwbHJ2OW0xZzBhYXpoaG8ifQ.l5at2Lcce4D_XJc8o6tglg';
var rad = 100;
var coordinates = document.getElementById('coordinates');

var West = L.latLng( -60.0,  180.0),
    East = L.latLng( 60.0,  -180.0),
    bounds = L.latLngBounds(West, East);

var map = L.mapbox.map('map', 'mapbox.streets', {  //mapbox.emerald
    maxBounds: bounds,
    maxZoom: 14,
    minZoom: 3,
    tileLayer: {
        continuousWorld: true,
        // This option disables loading tiles outside of the world bounds.
        noWrap: false
    }
});

var clusteredMarkers = L.markerClusterGroup();
var lat;
var lon;
var marker;
var filterCircle;


// add listeners 

$("h2").text("Projects Map")

$("#radius").change(function(e){
    rad = event.target.value;
    filterCircle.setRadius(rad * 1000);
});

$("#radius").mousewheel(function(event) {
    rad = event.target.value;
    filterCircle.setRadius(rad * 1000);
});

//center map on marker
map.featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
});

var ondragvar = function ondrag(){
    var m = marker.getLatLng();
    filterCircle.setLatLng(m);
    lat = m.lat;
    lon = m.lng;
    coordinates.innerHTML = 'Latitude: ' + lat.toPrecision(6) + '<br />Longitude: ' + lon.toPrecision(6);

 function ondragend (){
  window.history.pushState({marker_lat: lat, marker_lng: lon}, "Responder tool - Map", '/map.php');
  // window.history.pushState("", "", '/map.php?marker_lat='+lat+'&marker_lng='+lon);
  console.log(lat)
  } 
}


// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});

if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
}

map.on('locationfound', function(e) {
    init_marker([e.latlng.lat, e.latlng.lng]);
});


function init_marker(latlng){

    lat = latlng[0];
    lon = latlng[1];

    // add dragable marker 
    marker = L.marker(latlng, {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f86767',
          "marker-symbol": "circle",
        }),
        draggable: true
    }).addTo(map);

    filterCircle = L.circle(latlng, rad * 1000, {
        opacity: 1,
        weight: 1,
        fillOpacity: 0
    }).addTo(map);

    // every time the marker is dragged, update the coordinates container
    // marker.addEventListener('drag', ondragvar)
    // marker.on('drag', ondragvar);
    marker.on('dragend', ondragend);

    show_nearby_projects(latlng, rad);
 coordinates.innerHTML = 'Latitude: ' + latlng[0].toPrecision(6) + '<br />Longitude: ' + latlng[1].toPrecision(6) ;
}


function start_location(){
    // hier toegang tot locatie vragen
    map.locate();
}


function projects_near_marker(){
    // remove old markers    
    map.removeLayer(clusteredMarkers);
    clusteredMarkers = L.markerClusterGroup();

    // query oipa
    show_nearby_projects([lat, lon], rad);
    coordinates.innerHTML = 'Latitude: ' + lat.toPrecision(6) + '<br />Longitude: ' + lon.toPrecision(6);
}

//OIPA call with 2 coordinates
 function show_nearby_projects(latlng, distance){

            $('#loader').css('display', 'block');
            // $(".view-controller").on("dragend", function(e) {
            //     that.dragStartChild(e);
            // });
            // $('#loader').bind(ondragvar)
          
           var projectAPI = "https://www.oipa.nl/api/locations/";
           $.getJSON( projectAPI, {
              format: "json",
              location_longitude: latlng[1],
              location_latitude: latlng[0],
              location_distance_km: distance,
              page_size: 200
            })
            .done(function(data){

                console.log(data);
    

                var geojson = [];

                // voor elke location, maak geojson aan
                $.each(data.results, function(i, location) {

                    if(location.point.pos == null){ return false; }

                    var longitude = location.point.pos.longitude;
                    var latitude = location.point.pos.latitude;
                    
                    var activity = location.activity;
                    var title = activity.id;

                    if(activity.title != null && activity.title.narratives.length){
                        title = activity.title.narratives[0].text.split(/\s+/).slice(0,6).join(" ");
                    }

                    if (data.results[i].feature_designation != null){
                      if(data.results[i].feature_designation.name != null){
                        var designation = data.results[i].feature_designation.name
                      }
                    }
                    
                    var popupContent = '<div>';
                        popupContent += '<h3><b>'+title+'</b></h3>';
                        if (data.results[i].feature_designation != null){ 
                        popupContent += 'Designation: '+designation+'<br>'; }
                        popupContent += '<a href="/detail.php?activity_id='+activity.id+'">Read more</a>'+" about this project";
                        popupContent += '</div>';

                    var marker = L.marker(new L.LatLng(latitude, longitude), {
                        icon: L.mapbox.marker.icon({
                            "marker-color": "#3ca0d3",
                            "marker-size": "medium",
                            "marker-symbol": "star"}),
                    });

                    marker.bindPopup(popupContent,{
                        closeButton: true,
                        minWidth: 160
                    });

                    clusteredMarkers.addLayer(marker);
                });

                map.addLayer(clusteredMarkers);

                // coordinates.innerHTML = 'Latitude: ' + latlng[0].toPrecision(6) + '<br />Longitude: ' + latlng[1].toPrecision(6) ;
                if (data.count == 0){
                 alert('No projects availabe, choose a different location');
                }
                   
                   // var project_count = document.getElementById("count");
                if (data.count > data.results.length){
                var project_count = "Showing first 200 of "+ data.count+" projects";
                
                function show_more(){
                    var projectAPI = "https://www.oipa.nl/api/locations/";
                   
                       $.getJSON( projectAPI, {
                          format: "json",
                          location_longitude: longitude,
                          location_latitude: latitude,
                          location_distance_km: distance,
                          fields: "id,activity,point",
                          page_size: 200,
                          page:2
                        })
                 }
                   document.getElementById("count").innerHTML = project_count;
                }
             

                bounds = filterCircle.getBounds();
                map.fitBounds(bounds);

                // $('#loader').unbind(ondragvar)
                $('#loader').css('display', 'none');
      });

}







