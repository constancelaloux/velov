let canvasVar = document.getElementById("draw");
const cxt = canvasVar.getContext('2d');
let canvasIsEmpty = true;
var isDrawing;


var canvasObject =
{

    showCanvas: function ()
    {
        //Signature avec la souris
        canvasVar.addEventListener('mousedown', function (e)
            {
                var mouseX = e.pageX - this.offsetLeft;
                var mouseY = e.pageY - this.offsetTop;
                addClick(mouseX, mouseY);
                scribble();
            }
        );

        canvasVar.addEventListener('mousemove', function (e)
            {
                if (isDrawing == true)
                {
                    var mouseX = e.pageX - this.offsetLeft;
                    var mouseY = e.pageY - this.offsetTop;
                    addClick(mouseX, mouseY, true);
                    scribble();
                }
            }
        );

	    canvasVar.addEventListener('mouseup', function (e) {
            isDrawing = false;
        });

	    canvasVar.addEventListener('mouseleave', function (e) {
            isDrawing = false;
        });


        //Signature tactile
        canvasVar.addEventListener('touchstart', function (e)
            {
                // La méthode preventDefault() de cet objet permet d’empêcher le navigateur 
                //de déclencher son comportement par défaut.
                // => L'écran ne bouge pas quand on ecrit avec le doigt.
                e.preventDefault();
                var mouseX = e.changedTouches[0].pageX - this.offsetLeft;
                var mouseY = e.changedTouches[0].pageY - this.offsetTop;
                addClick(mouseX, mouseY);
                scribble();
            }
        );
    	
        canvasVar.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (isDrawing == true)
            {
                var mouseX = e.changedTouches[0].pageX - this.offsetLeft;
                var mouseY = e.changedTouches[0].pageY - this.offsetTop;
                addClick(mouseX, mouseY, true);
                scribble();
            }
        });

        canvasVar.addEventListener('touchend', function (e) {
            e.preventDefault();
            isDrawing = false;
        });

        canvasVar.addEventListener('touchleave', function (e) {
            e.preventDefault();
            isDrawing = false;
        });


    	// Tableau des Abcisses
        var lastX = new Array();
    	// Tableau des Ordonnées
        var lastY = new Array();
        var lastDrag = new Array();
        

    	// Sauvegarde tous les points dans le tableau
        function addClick(x, y, dragging)
        {
            lastX.push(x);
            lastY.push(y);
            lastDrag.push(dragging);
        }



        function scribble()
        {
	        // Nettoyer  le canvas
            cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);

	        // Peronnalisation de la signature
            cxt.strokeStyle = "black";
            cxt.lineJoin = "round";
	        cxt.lineCap = "round";
            cxt.lineWidth = 4;

            // La boucle permet de parcourir le tableau des points en abcisse (horizontal) effectués par la souris
            for (var i = 0; i < lastX.length; i++) {

		        // Methode pour commencer le chemain du tracé
                cxt.beginPath();

                if (lastDrag[i] && i) {

        		    // moveTo() methode pour faire bouger le chemin à un point spécifique dans le canvas SANS créer de ligne
                    // Pas de ligne lorsque l'on relache le click et que l'on va écrire ailleur dans le canvas
        		    // moveTo(abcisse, ordonnés);
                    cxt.moveTo(lastX[i - 1], lastY[i - 1]);
                } else {
                    // moveTo() methode pour faire bouger le chemain à un point spécifique dans le canvas EN créant une ligne
                    // Permet de créer une ligne
                    cxt.moveTo(lastX[i] - 1, lastY[i]);
                }
		
		        // lineTo() methode qui ajoute un nouveau point et créer une ligne entre ces deux points
                // Créé une ligne d'un point à un autre
                cxt.lineTo(lastX[i], lastY[i]);

		        // closePath() methode qui crée un chemain du point actuel jusqu'au point de départ
                cxt.closePath();

		        // stroke() methode qui dessine le chemain de la signature
                cxt.stroke();

            } // Fin for

            isDrawing = true;
	        canvasIsEmpty = false;

        } 
    },


    clearCanvas: function ()
    {
	    // clearRect() methode qui nettoie le canvas
	    // context.clearRect(x,y,width,height);
        cxt.clearRect(0, 0, canvasVar.width, canvasVar.height);

        canvasIsEmpty = true;

    }
};
