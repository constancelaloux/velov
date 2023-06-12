function ajaxGet(url, callback)
{
    // L'objet XMLHttpRequest est utilisé pour échanger des données avec un serveur web
    var req = new XMLHttpRequest();
    req.open("GET",url, false);
    // Envoi de la requête
    req.addEventListener("load", function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                callback(req.responseText);
            }
            else
            {
                console.error("Status = " +req.status + " : " + req.statusText + ". URL :  " + url);
            }
        });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);

};



