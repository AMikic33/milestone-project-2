// declaring variables

var map;
var center;
var search = [];
var infoWindow;
var updatedType = [];
var marker = [];
var markersClear = [];
var place = "";
var searchResults = [];
var city = [];

// objects for searching place types

var searchOne = {
	id: "library",
	title: "Library",
	typeList: ["library"]
};
var searchTwo = {
	id: "art_gallery",
	title: "Art Gallery",
	typeList: ["art_gallery"],
};
var searchThree = {
	id: "museum",
	title: "Museum",
	typeList: ["museum"]
};
var searchFour = {
	id: "book_store",
	title: "Book Store",
	typeList: ["book_store"],
};
var searchFive = {
	id: "movie_theater",
	title: "movie Theater",
	typeList: ["movie_theater"],
};
var searchSix = {
	id: "stadium",
	title: "Stadium",
	typeList: ["stadium"]
};
var searchSeven = {
	id: "attraction",
	title: "Tourist Attraction",
	typeList: ["tourist_attraction"],
};
var searchEight = {
	id: "city_hall",
	title: "City Hall",
	typeList: ["city_hall"],
};

search.push(
	searchOne,
	searchTwo,
	searchThree,
	searchFour,
	searchFive,
	searchSix,
	searchSeven,
	searchEight
);

// initiating and displaying map

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 3,
		center: {
			lat: 46.619261,
			lng: -33.134766,
		},
    });
    
    infowindow = new google.maps.InfoWindow();

	searchSelectCity();
	buttonPickPlaceType();
}

/* updating neccessary variables and elements for chosen place type */
function buttonPickPlaceType(IDbutton) {
	var i = 0;

	for (i = 0; i < search.length; i++) {
		if (search[i].id == IDbutton) {
			document.getElementById("textInterest").innerHTML = search[i].title;
			updatedType = search[i].typeList;
		}
	}
}

/* Location input and the autocomplete. Gets city information from Google Places and adds a listener */
function searchSelectCity() {
	var restrictionSet = {
		types: ["(cities)"],
	};

	var typeCity = document.getElementById("locationName");
	var autocomplete = new google.maps.places.Autocomplete(
		typeCity,
		restrictionSet
	);
	var updateLatLng;

	
	google.maps.event.addListener(autocomplete, "place_changed", function () {
		place = autocomplete.getPlace();
	});

	// when submit button is clicked - the map center is changed to the new location

	searchForm.addEventListener("submit", function (event) {
		event.preventDefault();
		if (place !== "") {
			updateLatLng = new google.maps.LatLng(
				place.geometry.location.lat(),
				place.geometry.location.lng()
			);
			map.setZoom(13);
			center = updateLatLng;
			map.setCenter(center);
			document.getElementById("textLocation").innerHTML = place.adr_address;
		} else {
			alert("Please enter location");
		}
	});
}

//  creating request and reseting the map if the location and place type haven't been chosen
function requestLocations() {
	//   clearMap();

	if (
		document.getElementById("textLocation").innerHTML != "None" &&
		document.getElementById("textInterest").innerHTML != "None"
	) {
		map.setCenter(center);

		var request = {
			location: center,
			radius: 8047,
			types: updatedType,
		};

		var service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, callback);
	} else {
		alert("Please select a location AND a an interest.");
	}
}

/* adding markers to the requested results on the map - alerting if no results */

function callback(results, status) {
	if (status == "ZERO_RESULTS") {
		alert("No results to show");
		return;
	}
	searchResults = results;

	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < searchResults.length; i++) {
			markerCreator(searchResults[i]);
		}
	}
}

// creating marker

function markerCreator(place) {
	marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
	});

	markersClear.push(marker);

google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(`<h4>${place.name}</h4> <p><b>Rating:</b> ${place.rating}</p><p><b>Type:</b> ${document.getElementById('textInterest').innerHTML}</p>`);
            infowindow.open(map, this);
        }); 
    }


/* function deleting markers enables a search for another interest in the same city */

function deleteMarkers() {

    for (var i = 0; i < markersClear.length; i++) {
        markersClear[i].setMap(null);
    }
    markersClear = [];
}

/* function reseting "current search" fields and deleting markers -site ready for a full new search */

function resetSearch() {
	place = "";
	center = "";
	updatedType = [null];

    resetFields();
    deleteMarkers();

}

