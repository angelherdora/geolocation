;(function(){
  var btnLocate = $('#btnLocate'),
      blkMap = $('#map'),
      address = $('#address'),
      btnRoute = $('#btnRoute'),
      blkPanelRoute = $('.panel');

  var lat = Number(blkMap.attr('data-lat')),
      lng = Number(blkMap.attr('data-lng')),
      icon = blkMap.attr('data-icon'),
      zoom = 0,
      config = [{
        "featureType": "poi",
        "stylers": [
          { "visibility": "on" }
        ]
      }],
      options = {
        //
      };

  var id, myLatlng, GMap;
  var route = btnRoute.attr('data-lat')+','+btnRoute.attr('data-lng');

  var controllerMap = function(lat,lng, zoom){
    //
  };

  var controllerPin = function(lat, lng){
    //
  };

  var controllerInfoWindow = function(lat, lng){
    //
  };

  var controllerLocate = function(){
    $(btnLocate).click(function(e){
      e.preventDefault();
      if (navigator.geolocation) {
        console.info('Obteniendo tu ubicación...');
        // navigator.geolocation.clearWatch(id);
        // navigator.geolocation.watchPosition(function(position){
        navigator.geolocation.getCurrentPosition(function(position){
          lat = position.coords.latitude, lng = position.coords.longitude;
          controllerMap(lat,lng,20);
          controllerInfoWindow(lat,lng);
        }, function(error){
          console.warn('ERROR(' + error.code + '): ' + error.message);
        }, options);
      } else {
        console.info('La Geolocalización no es soportada en este navegador');
      }
    });
  };

  var controllerGeocode = function(){
    var geocoder = new google.maps.Geocoder();
    $(address).bind('keypress', function(e) {
      var code = e.keyCode || e.which;
      if (e.which == 13) {
        geocoder.geocode({'address': address[0].value}, function(results, status) {
          if (status === 'OK') {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            controllerMap(lat,lng,16);
            // controllerPin(lat,lng);
            controllerInfoWindow(lat,lng);
          } else {
            controllerLocate();
          }
        });
        return false;
      }
    });
  };
  var controllerTraceRoute = function(lat, lng){
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    myLatlng = lat+','+lng;
    directionsDisplay.setMap(GMap);
    directionsDisplay.setPanel(blkPanelRoute[0]);
    blkPanelRoute.addClass('show');
    blkMap.addClass('expand');
    directionsService.route({
      origin: myLatlng,
      destination: route,
      travelMode: 'BICYCLING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };
  var controllerRoute = function(){

    $(btnRoute).on('click', function(){
      if (navigator.geolocation) {
        console.info('Obteniendo tu ubicación...');
        navigator.geolocation.getCurrentPosition(function(position){
          lat = position.coords.latitude, lng = position.coords.longitude;
          controllerTraceRoute(lat, lng);
        }, function(error){
          console.warn('ERROR(' + error.code + '): ' + error.message);
        }, options);
      } else {
        console.info('La Geolocalización no es soportada en este navegador');
      }
    });

  };



  var init = function(){
    controllerMap(lat,lng,zoom);
    // controllerLocate();
    // controllerGeocode();
    // controllerRoute();
  };
  init();
})();
