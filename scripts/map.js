    // declaring variables

    var map;
    var center;
    var search = [];
    var infowindow;
    var updatedType = [];
    var marker = [];
    var markersClear = [];
    var place = "";
    var searchResults = [];
    var city = [];
    
    // objects for searching interests

    var searchOne = { id:"library", title: "Library", typeList:['library']};
    var searchTwo = { id:"art_gallery", title: "Art Gallery", typeList:['art_gallery']};
    var searchThree = { id:"museum", title: "Museum", typeList:['museum']};
    var searchFour = { id:"book_store", title: "Book Store", typeList:['book_store']};
    var searchFive = { id:"movie_theater", title: "movie Theater", typeList:['movie_theater']};
    var searchSix = { id:"stadium", title: "Stadium", typeList:['stadium']};
    var searchSeven = { id:"attraction", title: "Tourist Attraction", typeList:['tourist_attraction']};
    var searchEight = { id:"city_hall", title: "City Hall", typeList:['city_hall']};

    search.push(searchOne, searchTwo, searchThree, searchFour, searchFive, searchSix, searchSeven, searchEight);

    

// initiating and displaying the map element 
  

    function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: {
            lat: 46.619261,
            lng: -33.134766
            }
        });
        
        searchSelectCity();
        buttonSelectSearchType();

            }

                // interests


    function buttonSelectSearchType(buttonID) {
    var i = 0;

    for (i = 0; i < search.length; i++) {
     
        if (search[i].id == buttonID) {
          
            document.getElementById('textInterest').innerHTML = search[i].title;
            updatedType = search[i].typeList;
        }
    }
}

function searchSelectCity() {

    var restrictionSet = {
        types: ['(cities)'],
    };

    var typeCity = document.getElementById('locationName');
    var autocomplete = new google.maps.places.Autocomplete(typeCity, restrictionSet);
    var updateLatLng;

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        place = autocomplete.getPlace();
    });

    /* when the submit button is clicked in the cityForm, the map center is changed to this new location and the values are set using the DOM */
    searchForm.addEventListener("submit", function() {
        if (place !== "") {
            updateLatLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
            map.setZoom(13);
            center = updateLatLng;
            map.setCenter(center);
            document.getElementById('textLocation').innerHTML = place.adr_address;
        }
        else {
            alert("Please enter location");
        }
    });
}

function requestLocations() {
    clearMap();
 
    if (document.getElementById('textLocation').innerHTML != "None" && document.getElementById('textInterest').innerHTML != "None") {

        map.setCenter(center);

        var request = {
            location: center,
            radius: 8047,
            types: updatedType
        };

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

        else {
            alert("Please select a city AND a search type before searching");
    }
}



function callback(results, status,) {
    searchResults = [];
    searchResults = results;

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < searchResults.length; i++) {
            createMarker(searchResults[i]);
        }
    }
}

function createMarker(place) {
    marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    //adds each place item to  the markersClear array
    markersClear.push(marker);

    //adds the infowindow to each marker as a popup when the marker is clicked
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(`<h4>${place.name}</h4><p><b>Type:</b> ${document.getElementById('textInterest').innerHTML}</p>`);
        infowindow.open(map, this);
    });
}

function resetSearch() {
    place = "";
    center = "";
    updatedType = [null];

    clearMap();
    resetFields();
}