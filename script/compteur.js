var intervalId;
var displayCompteur = document.getElementById("compteur");
var twentyMinutes = 1200000; // 20 minutes

var timer = {
    
    start: function ()
    {
        // Storage de la date de résa en millisecondes
        var dateObject = new Date();
        var startTime = dateObject.getTime();
        //Calcule du tmps de fin de réservation : Temps de départ + 20 minutes (1200 secondes, donc 1 200 000 milisecondes)
        var endTime = startTime + twentyMinutes;
        sessionStorage.setItem("finResa", endTime);
    },

    setInterval: function ()
    {
        intervalId = setInterval(timer.initInterval, 1000);
    },
    
    
    initInterval: function()
    {
        var dateObject = new Date();
        // Temps acutel en milisecondes
        var startTime = dateObject.getTime();

        // Calcule du temps de réservation : temps de début de réservation - le temps actuel
        var fullTime = sessionStorage.finResa - startTime;
        // Calcule des minutes et secondes
        var fullSeconds = fullTime / 1000;
        var minutes = Math.floor(fullSeconds / 60);
        var secondes = Math.floor(fullSeconds - minutes * 60);
    
        // Display
        timerSentence.style.display = "block";
        displayCompteur.textContent = minutes + " minutes et " + secondes + " secondes";

        if (fullTime<=0) {
            timer.clearTimer();
            validateBookingsentence.innerHTML = "";
            // On peut de nouveau effectuer une réservation 
            isBooking = true;
            titleCanceled.style.display = "block";
            titleCanceled.textContent = "Réservation terminée";
            // Suppression bouton cancel
            cancelButton.style.display= "none";
        }
    },
        

    clearTimer: function ()
    {
        clearInterval(intervalId);
        sessionStorage.removeItem("finResa");
        timerSentence.style.display = "none";
        titleCanceled.style.display = "none";
    }
    
};


// Reload page 
if (sessionStorage.getItem("finResa") !== null && sessionStorage.getItem("marker_selected") !== null)
{
    // Le compteur reste affiché
    timerSentence.style.display = "block";

    document.getElementById('stationstatus').textContent = sessionStorage.getItem('marker_stationstatus');
    document.getElementById('name').textContent = sessionStorage.getItem('marker_selected');
    document.getElementById('adress').textContent = sessionStorage.getItem('marker_stationadress');
    document.getElementById('bikesstands').textContent = sessionStorage.getItem('marker_bikesstands');
    document.getElementById('availablebikesstands').textContent = sessionStorage.getItem('marker_availablebikesstands');
    document.getElementById('availablebikes').textContent = sessionStorage.getItem('marker_availablebikes');

    //La partie avec les informations de la station s'affiche
    windowAside.style.display = "block";
    //Block avec les informations des stations
    itemForm.style.display = "block";
    //Le message "vous avez validé la réservation" s'affiche
    validateBookingsentence.style.display = "block";
    validateBookingsentence.innerHTML =
                "Vous avez réservé un vélo à la station "
                + sessionStorage.getItem('marker_selected') 
                + " à l'adresse " 
                + sessionStorage.getItem('marker_stationadress')
                + " au nom de " 
                + sessionStorage.getItem('Nom') 
                + " " + sessionStorage.getItem('Prenom');

    // Bouton réservé caché
    bookButton.style.display = "none";
    //Le bouton annuler la réservation s'affiche
    cancelButton.style.display = "block";
    isBooking = false;
    timer.setInterval();
};

if (sessionStorage.getItem("finResa") == null && sessionStorage.getItem("marker_selected") !== null)
{
    titleCanceled.style.display = "none";
    timerSentence.style.display = "none";
    cancelButton.style.display = "none";
};
