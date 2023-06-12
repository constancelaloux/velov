var displayMessageNoBooking = document.getElementById ("message");
var contactForm = document.getElementById ("contact");
var bookButton = document.getElementById ("booking");
var validateButton = document.getElementById ("mybutton");
var validateBookingsentence = document.getElementById("text");
var cancelButton = document.getElementById("cancel");
var customerInformations = document.getElementById('contactInformation');
var isBooking = true; // On peut réserver
var windowAside = document.getElementById("content");
var itemForm = document.getElementById("itemform");
var availableBikes = document.getElementById('availablebikes');
var timerSentence = document.getElementById("timer");
var titleCanceled = document.getElementById("titleCanceled");


//LE DETAIL DES STATIONS
var stationForm =
{
    //Les informations de la station s'affiche quand on clique sur un marker
    initForm: function (marker)
    {   
        marker.addListener ('click', function() 
        {
            // Si une réservation est déjà en cours
            if (isBooking == false)
            {
                //Si on ne peut pa réserver sans annuler la réservation, une alert s'affiche
                var popUpConfirm = confirm("Vous êtes sur le point d'effectuer une réservation à la station " + marker.infos.name 
                    + ". Cette réservation entrainera l'annulation de votre réservation en cours.");
                
                if (popUpConfirm == true)
                {
                
                    // Bouton annuler
                    cancelButton.style.display = "block";

                    document.getElementById("clearthebooking").innerHTML ="";

                    // On cache le block de droite
                    contactForm.style.display = "none";
                    //Si on annule la réservation et si on click sur un autre marker, le bouton valider et clearcanvas seront display
                    customerInformations.style.display = "flex";
                    
                }
                else
                {
                    return;
                }
            }

            // Permière Réservation ou après une annulation
            else
            {  
                // Storage des informations de la station
                stationForm.sessionStorageStation(this);

                // On cache la partie footer
                titleCanceled.style.display = "none";
                
                // On cache la phrase du compte à rebours
                timerSentence.style.display = "none";
            }

            //On affiche les informations de la station
            stationForm.displayBlockRight(this);

            //La partie avec les informations de la station s'affiche
            windowAside.style.display = "block";
            //Block avec les informations des stations
            itemForm.style.display = "block";

            // Canvas
            canvasObject.clearCanvas();
            canvasObject.showCanvas();

            // Condition pour valider une réservation
            stationForm.initContactform(this);
        });

    }, /* FIN INITFORM */
        
    sessionStorageStation: function (marker)
    {
        //On store les informations de la station pour les afficher dans le message
        sessionStorage.setItem('marker_stationstatus', marker.infos.status);
        sessionStorage.setItem('marker_selected',marker.infos.name);
        sessionStorage.setItem('marker_stationadress', marker.infos.address);
        sessionStorage.setItem('marker_bikesstands', marker.infos.stands);
        sessionStorage.setItem('marker_availablebikesstands', marker.infos.availablestands);
        sessionStorage.setItem('marker_availablebikes', marker.infos.bikes);
    },

    displayBlockRight: function (marker)
    {
        //On affiche les informations de la station
        document.getElementById('stationstatus').textContent = marker.infos.status;
        document.getElementById('name').textContent = marker.infos.name;
        document.getElementById('adress').textContent = marker.infos.address;
        document.getElementById('bikesstands').textContent = marker.infos.stands;
        document.getElementById('availablebikesstands').textContent = marker.infos.availablestands;
        availableBikes.textContent = marker.infos.bikes;
    },     
        
        
        
        
    //ON CLIQUE SUR RESERVER et on affiche le formulaire de réservation
        
    initContactform: function(marker)
    {
        //conditions (close/open) et le nombre de vélos requis pour la réservation
        if (marker.infos.status === 'OPEN' && marker.infos.bikes > 0)
        {   
            // Pas de message de non disponibilité des vélos
            displayMessageNoBooking.innerHTML = "";
            
            // Le bouton réserver pour avoir le formulaire s'affiche
            bookButton.style.display = "block";
                
            // Quand je clique sur le bouton réserver
            // on affiche le formulaire de réservation avec nom, prenom, etc
            bookButton.addEventListener('click', function()
            {   
                //Le formulaire de réservation s'affiche
                contactForm.style.display = "block";
                
                //Si on annule la reservation et si l'on clique sur un autre marker, le bouton valider et clearcanvas seront display
                customerInformations.style.display = "flex";
                
            });
            // Pas de message d'annulation
            document.getElementById("clearthebooking").innerHTML ="";
        }
        else 
        {
            // Pas de vélo disponible
            displayMessageNoBooking.innerHTML = "Pas de vélos disponibles à la réservation";
            // Pas de formulaire de contact
            contactForm.style.display = "none";
            //Cache le bouton de Réservation
            bookButton.style.display ="none";
            // Pas de message d'Annulation
            document.getElementById("clearthebooking").innerHTML = "";
        }

    }, // Fin initContactform 

}; // FIN DE L'OBJET FORMULAIRE DE RESERVATION


    //Bouton "Envoyer" de Validation du formulaire de contact
    validateButton.addEventListener('click', function() 
        {   
            //on reprend la valeur de ce que l'on met dans l'id
            var nomElt = document.getElementById('surname');
            var valeurNom = nomElt.value;

            var prenomElt = document.getElementById('firstName');
            var valeurPrenom = prenomElt.value;

            var phonenumberELT = document.getElementById('phonenumber');
            var valeurNumber = phonenumberELT.value;


            //Storage des informations de l'utilisateur
            sessionStorage.setItem('Nom', valeurNom);
            sessionStorage.setItem('Prenom', valeurPrenom);
            sessionStorage.setItem('Numero', valeurNumber);
            
            //Storage des informations de la station
            var stationStatus = document.getElementById('stationstatus').textContent;
            sessionStorage.setItem('marker_stationstatus', stationStatus);

            var stationName = document.getElementById('name').textContent; 
            sessionStorage.setItem('marker_selected', stationName);
            
            var stationAdress = document.getElementById('adress').textContent; 
            sessionStorage.setItem('marker_stationadress', stationAdress);

            var stationBikesStands = document.getElementById('bikesstands').textContent;
            sessionStorage.setItem('marker_bikesstands', stationBikesStands);

            var stationBikesAvailableStands = document.getElementById('availablebikesstands').textContent;
            sessionStorage.setItem('marker_availablebikesstands', stationBikesAvailableStands);

            var stationBikesAvailable = document.getElementById('availablebikes').textContent;
            sessionStorage.setItem('marker_availablebikes', stationBikesAvailable);
            
            //Le formulaire doit étre rempli pour valider la réservation
            if (valeurNom === "" || valeurPrenom === "" || valeurNumber === "" || canvasIsEmpty) 
            {
                //On affiche une alert si les champs ne sont pas remplis
                alert("veuillez renseigner tous les champs");
            }

            //Validation de la réservation à partir du moment ou tous les champs sont remplis
            else 
            {
                // On soustrait 1 velo à la station
                // Puis on le store
                var numberOfBike = parseInt(sessionStorage.getItem('marker_availablebikes')) - 1 ;
                sessionStorage.removeItem("marker_availablebikes");
                sessionStorage.setItem('marker_availablebikes', numberOfBike);
                availableBikes.textContent = sessionStorage.getItem('marker_availablebikes');
                // Résa en cours
                if (isBooking === false)
                {
                    timer.clearTimer();
                }
                else
                {
                    isBooking = false;
                }

                //Le message "vous avez validé la réservation" s'affiche       
                validateBookingsentence.style.display = "block";
                if (isDrawing === false) 
                { 
                    validateBookingsentence.innerHTML =
                    "Vous avez réservé un vélo à la station "
                    + sessionStorage.getItem('marker_selected') 
                    + " à l'adresse " 
                    + sessionStorage.getItem('marker_stationadress')
                    + " au nom de " 
                    + sessionStorage.getItem('Nom') 
                    + " " + sessionStorage.getItem('Prenom')
                    
                    
                    //Bouton "Réserver" caché
                    bookButton.style.display="none";
                    // Formulaire contact caché
                    customerInformations.style.display = "none";
                    // On montre le bouton "Annuler"
                    cancelButton.style.display= "block";
                    // "Annulation de la réservation" caché
                    titleCanceled.style.display = "none";
                    
                }

                //Le compteur s'affiche
                timerSentence.style.display = "block";  
                
                // Storage du temps de fin de réservation
                timer.start();
                // Démarrage du compteur
                timer.setInterval();
            }
        } // Bouton valider la réservation
    ); 




    


cancelButton.addEventListener("click", function () 
    { 
        sessionStorage.clear();
        document.getElementById("clearthebooking").innerHTML = "Réservation annulée";
        isBooking = true; // on peut réserver à nouveau
        validateBookingsentence.innerHTML = "";
        // Affichage du bouton de réservation
        bookButton.style.display = "block";

        //La partie avec les informations de la station s'affiche
        windowAside.style.display = "none";
        //Block avec les informations des stations
        itemForm.style.display = "none";

        //Le bouton annuler s'enléve lorsque l'on a annulé la réservation
        cancelButton.style.display = "none";
        timerSentence.style.display = "none";
        // Arret et nettoyage des parametres du compteur
        timer.clearTimer();
    }
);

// Bouton Effacer la signature du canvas
clear.addEventListener('click', function ()
    {
        // Signture effacée
        canvasObject.clearCanvas();
        // Le canvas est pret à recevoir une nouvelle signature
        canvasObject.showCanvas(); 
    }
);
