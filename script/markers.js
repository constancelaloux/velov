var stationsBicycle = [];
var markers = [];
var iconcolor;
var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=8a2737547986bf94c935de247c42fba413a1d809";

var myMarkers =
{
    initStations: function (map)
    {
        ajaxGet(url, function (get)
        {
            stationsBicycle = JSON.parse(get);
        }
        // On a récupéré les données dans un tableau               
        )
        if (stationsBicycle == "")
        {
            console.error("Problème de chargement des markers");
            return;
        }
        else
        {
            this.initMarkers(stationsBicycle, map);
        }
        
    },
    
    initMarkers: function (stationsBicycle, map)
    {
        for (var i = 0; i < stationsBicycle.length; i++) 
        {
            var station = stationsBicycle[i];
            
            if (station.status === 'OPEN' && station.available_bikes > 0) 
            { 
                iconcolor = 'images/icongreen.png';
            } 
            else if (station.status === 'CLOSED')
            {
                iconcolor = 'images/iconclose.png';
            }
            else
            {
                iconcolor  = 'images/iconred.png';
            }
            
            var marker = new google.maps.Marker 
            ({
            
            map: map,
            position:
                {
                    lat: station.position.lat,
                    lng: station.position.lng
                
                },
            infos: 
                {
                    status:station.status,
                    name: station.name,
                    address:station.address,
                    stands: station.bike_stands,
                    availablestands: station.available_bike_stands,
                    bikes: station.available_bikes
                },
            icon: iconcolor
            
            });
            markers.push(marker);
            stationForm.initForm(marker);

        } // Fin for

        var markerCluster = new MarkerClusterer(map, markers,{imagePath: "images/m/m"}); 
    }

};
