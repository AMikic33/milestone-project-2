


/* initiating and displaying the map element */


    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: {
            lat: 46.619261,
            lng: -33.134766
            }
        });

        
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

            marker.setIcon(({
                url: place.icon,
                size: new google.maps.size(71,71),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(17,34),
                scaledSize: new google.maps.Size(35,35)

            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join('');
            }

            infowindow.setContent('<div><strong>' + place.name + '</strong>' + address);
            infowindow.open(map, marker);

            // location details

            for (var i = 0; i< place.address_components.length; i++) {
                if(place.address_components[i].types[0] == 'postal_code'){
                    document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
                }
                if(place.address_components[i].types[0] == 'country'){
                    document.getElementById('country').innerHTML = place.address_components[i].long_name;
                }
            }

            document.getElementById('location').innerHTML = place.formatted_address;
            });
    }