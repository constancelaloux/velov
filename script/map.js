let Map = 
{
    lat: 45.763924,
    lng: 4.835652,
    zoom: 13,
    mapTypeId: 'roadmap',
};

let myMap = Object.create(Map);



function initMap()
{
    var map = new google.maps.Map(document.getElementById('map'),
        {
            zoom: myMap.zoom,
            mapTypeiId: myMap.mapTypeId,
            center: 
            {
                lat: myMap.lat,
                lng: myMap.lng
            }
        }
    );
    myMarkers.initStations(map);

}
