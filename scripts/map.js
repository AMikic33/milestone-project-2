
/* declaring variables */

var map;
var center;


/* initiating and displaying the map element */

<script>
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: {
            lat: 46.619261,
            lng: -33.134766
            }
        });
    }
</script>