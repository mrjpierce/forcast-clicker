function initMap() {
    var uluru = {lat: 40.3121214, lng: -111.7120258};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        draggable: true,
        position: uluru,
        map: map
    });
}