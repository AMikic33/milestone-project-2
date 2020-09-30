    // declaring variables

    var center;
    var updatedType = [];
    var marker = [];
    var search = [];
    
    // objects for searching interests

    var searchOne = { id:"library", title: "Library", typeList:['library']};
    var searchTwo = { id:"art_gallery", title: "Art Gallery", typeList:['art_gallery']};
    var searchThree = { id:"museum", title: "Museum", typeList:['museum']};
    var searchFour = { id:"book-_store", title: "Book Store", typeList:['book_store']};
    var searchFive = { id:"movie_theater", title: "movie Theater", typeList:['movie_theater']};
    var searchSix = { id:"stadium", title: "Stadium", typeList:['stadium']};
    var searchSeven = { id:"attraction", title: "Tourist Attraction", typeList:['tourist_attraction']};
    var searchEight = { id:"city_hall", title: "City Hall", typeList:['city_hall']};

    search.push(searchOne, searchTwo, searchThree, searchFour, searchFive, searchSix, searchSeven, searchEight);

    

// initiating and displaying the map element 
  

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: {
            lat: 46.619261,
            lng: -33.134766
            }
        });
    
        buttonSelectSearchType();

         // display city

        var input = document.getElementById('searchInput');

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        


        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            
            if(place.geometry.viewport){
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(13);
            }


            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            
            });
            }

                // interests


    function buttonSelectSearchType(buttonID) {
    var i = 0;
    
    for (i = 0; i < search.length; i++) {

        //if statement ... if element clicked id = search[i].id then we change the items to show the chosen item
        if (search[i].id == buttonID) {
            document.getElementById('textInterest').innerHTML = search[i].title;
            updatedType = search[i].typeList;
        }
    }
}

function requestLocations() {
    clearMap();
 
    if (document.getElementById('textInterest').innerHTML != "None") {

        map.setCenter(center);

        var request = {
            location: center,
            radius: 8047,
            types: updatedType
        };

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    
}

function callback(results, status,) {
    searchResults = [];
    searchResults = results;

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < searchResults.length; i++) {
            createMarker(searchResults[i]);
            resultsTextDisplay(searchResults[i]);
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
