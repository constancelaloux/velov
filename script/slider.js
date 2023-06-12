var slide =
{
    //Initialise l'image
    init: function (image, text)
    {
        this.image = image;
        this.text = text;
    },

    //Renvoi à afficher le slide et le texte
    decrire: function ()
    {
        var descriptionImage = this.image;
        // renvoi la valeur
        return descriptionImage;
    },
    
    decriretext: function ()
    {
        var descriptionText = this.text;
        //renvoi la valeur
        return descriptionText;
    }
};

var slide1 = Object.create(slide);
slide1.init("images/bienvenu.jpg" , "Bienvenu sur notre site de réservation. Utilisez les fléches du clavier pour connaitre les étapes de la réservation");

var slide2 = Object.create(slide);
slide2.init("images/premiereetape.jpg", "Etape 1: naviguez sur la carte pour choisir votre station");

var slide3 = Object.create(slide);
slide3.init("images/deuxiemeetape.jpg", "Etape 2: cliquez sur le marker pour avoir des informations sur la station et le nombre de vélos disponibles à la réservation");

var slide4 = Object.create(slide);
slide4.init("images/troisiemeetape.jpg", "Etape 3: Cliquez sur le bouton Réserver 1 vélo et rémplissez le formulaire, signez puis validez");

var slide5 = Object.create(slide);
slide5.init("images/quatriemeetape.jpg", "Etape 4: Le décompte de temps ainsi que l'état de votre réservation s'afficheront en dessous de la carte. Si vous réservez dans une autre station, celle-ci remplace la précédente.");

//Les objets sont poussés dans le tableau
var slides = [];
slides.push(slide1);
slides.push(slide2);
slides.push(slide3);
slides.push(slide4);
slides.push(slide5);


var Slider = {
    
    slideFirst: 1,

    init: function(slides) {

        this.slides = slides;
        this.showDivs(this.slideFirst);

        this.initButtons();

    },

    initButtons: function() {
        // Ajout des événements au click bouton droit et gauche

        this.boutonLlt = document.getElementById("buttonleft");
        this.boutonLlt.addEventListener("click", () => {
            this.showDivs(this.slideFirst = this.slideFirst - 1)
        });

        this.boutonRlt = document.getElementById("buttonright");
        this.boutonRlt.addEventListener("click", () => {
            this.showDivs(this.slideFirst = this.slideFirst + 1)
        });

        document.addEventListener("keydown", (e) => {
            this.keyboardListener(e);
        });        
    },

    // Bouttons clavier
    keyboardListener: function(e)
    { 
        var keyboard = e.keyCode;

        if (keyboard == 39)
        {
        // Flèche droite
            this.showDivs(this.slideFirst = this.slideFirst + 1);
            document.getElementById("left-btn").className = "black";
            document.getElementById("right-btn").className = "red";
            setTimeout(function()
            {
                document.getElementById("right-btn").className = "black";
            }, 250);
            
        }
        if (keyboard == 37)
        {
            // Flèche gauche
            this.showDivs(this.slideFirst = this.slideFirst - 1);
            document.getElementById("right-btn").className = "black";
            document.getElementById("left-btn").className = "green";
            setTimeout(function()
            {
                document.getElementById("left-btn").className = "black";
            }, 250);
        }
    }, 

    showDivs: function(numeroImage) 
    {
        if (numeroImage > this.slides.length) {
            this.slideFirst = 1;
        }    

        if (numeroImage < 1) {
            this.slideFirst = this.slides.length;
        }

        for (var i = 0; i < this.slides.length; i++) { 
            if (this.slideFirst - 1 === i) {
                document.getElementById("mySlideun").src = this.slides[i].image;
                
                document.getElementById("firstp").innerHTML = this.slides[i].text;     
            }  
        }
    }

}

var slider = Object.create(Slider);
slider.init(slides);
