var mapCenterLocation = {};

function initAutocomplete() {
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    mapCenterLocation.lat = places[0].geometry.location.lat();
    mapCenterLocation.lng = places[0].geometry.location.lng();
    //console.log(mapCenterLocation);
    return mapCenterLocation;
    // console.log(places[0].geometry.location.lat() + places[0].geometry.location.lng());
  })
};
$(document).ready(function() {

  $("#searchButton").click(function() {
    $("body").empty();
    $("body").append(bodyReplace)
    // initMap()


    //console.log("HELLO");
    //console.log($("#searchButton"));


    function initMap() {

      var heard = {
        lat: 33.4724782,
        lng: -112.0743896
      }
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: mapCenterLocation
      });
      var marker = new google.maps.Marker({
        position: markerOne,
        map: map,
        title: 'Dinner',
      });
      console.log(markerOne);
      console.log(markerTwo);
      var marker = new google.maps.Marker({
        position: markerTwo,
        map: map,
        title: 'Activity'
      });
      //console.log(markerOne);
    };

    var markerOne = {};
    var markerTwo = {};
    // console.log(markerTwo);
    // console.log(markerTwo.lat + markerTwo.lng);
    //console.log(markerOne);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + mapCenterLocation.lat + "," + mapCenterLocation.lng + "&radius=5000&type=restaurant&type=food&keyword=Dinner&key=AIzaSyAUoiaJ4KpJcxYMF5tYEBTeHGwhmxfp60I",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "0bd780d7-a010-5ae1-93e7-cb37c0ec185c"
      }
    }

    $.ajax(settings).done(function(response) {
      // console.log(response.results);
      //console.log(response.results[4].name);
      markerOne.lat = response.results[3].geometry.location.lat;
      markerOne.lng = response.results[3].geometry.location.lng;
      $("#resultOneName").append(response.results[3].name);
      $("#resultOneAddress").append(response.results[3].vicinity);

      var settingsActivity = {
        "async": true,
        "crossDomain": true,
        "url": "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + mapCenterLocation.lat + "," + mapCenterLocation.lng + "&radius=5000&type=establishment&keyword=Things%20to%20do&key=AIzaSyAUoiaJ4KpJcxYMF5tYEBTeHGwhmxfp60I",
        "method": "GET",
        "headers": {
          "cache-control": "no-cache",
          "postman-token": "01479cc1-8bcd-843b-f718-e64f83bc2d31"
        }
      }

      $.ajax(settingsActivity).done(function(activitySearch) {
        markerTwo.lat = activitySearch.results[1].geometry.location.lat;
        markerTwo.lng = activitySearch.results[1].geometry.location.lng;
        $("#resultTwoName").append(activitySearch.results[1].name);
        $("#resultTwoAddress").append(activitySearch.results[1].vicinity);
        initMap();
      });



    });
  });
})
