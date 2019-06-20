
//Jquery validation
$(document).ready(function(){

$.validator.setDefaults({
        highlight : function(input) {
            // Données invalides : on ajoute la classe "error" au parent de l'input invalide
            $(input).parent().addClass("error");
        },
        unhighlight : function(input) {
            // Données valides : on supprime la classe "error" au parent de l'input valide
            $(input).parent().removeClass("error");
        },
        submitHandler: function() {
            // On n'envoie pas le formulaire, on affiche juste un message
            alert("Ceci est une simulation. Le formulaire a bien été soumis !");
        },
    });



});

function activerValidateur() {
    $("#form1").validate({
        rules: {
            nom: {
                required : true
            },
            date: {
                required : true,
                date: true
            },
            heure: {
                required : true,
                number : true,
                range: [13, 20]
            },
            salle: {
                required : true,
                range: [1, 3]
            },
            salleselect: {
              required: true
            },
            nombre: {
                required : true,
                range: [3, 5]
            },
            numero: {
                required : true,
                number: true,
                minlength: 10
            }
        },
        messages: {
            nom: {
                required : "   Veuillez renseigner ce champ"
            },
            date: {
                required  : "   Veuillez renseigner ce champ",
                date : "   Veuillez rentrer une date au format \" jour/mois \""
            },
            heure: {
                required : "   Veuillez renseigner ce champ",
                number : "   Veuillez rentrer une heure valide",
                range : "   L'Escape Game <i> \" Locked in 60' \"</i> est ouvert de 13h à 20h, du mardi au samedi"
            },
            salleselect: {
                required: "   Veuillez renseigner ce champ"
            },
            salle: {
                required : "   Veuillez renseigner ce champ",
                range : "   Veuillez rentrer une valeur comprise entre 1 et 3"
            },
            nombre : {
                required : "   Veuillez renseigner ce champ",
                range : "   Veuillez rentrer une valeur comprise entre 3 et 5"
            },
            numero : {
                required : "   Veuillez renseigner ce champ",
                number : "   Veuillez rentrer un numéro de téléphone valide",
                minlength : "   Veuillez rentrer un numéro de téléphone valide"
            }
        },
        success : function(label){
            label.html("").addClass("checked");
        },

    });
}
//
