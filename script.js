$(document).ready(function () {
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault(); //Detiene la action (en este caso detiene la action de IR a la URL cuando se hace click)

            // Store hash-
            var hash = this.hash; //Guarda el HASH de la url #blabla

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;

            });


        }
        // End if
    });

    $(".navbar a").on('click', function (event) {
        event.preventDefault();
        if(window.innerWidth < 768)
            $(".navbar-toggle").click();
    });

    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });

    });

    //___________________________________________________________
    //--------------VALIDACION DE FORMULARIO --------------------

    var nombre = $("#name");
    var email = $("#email");

    function validateUsername(){
        if(nombre.val().length < 4){
            nombre.focus();
            nombre.popover('show');
            return false;
        }
        else if(!nombre.val().match(/^[a-zA-Z]+$/)){
            nombre.focus();
            nombre.popover('show');
            return false;
        }
        else{
            nombre.popover('hide');
            return true;
        }
    }

    function validateEmail(){
        if(email.val().length == 0){
            email.focus();
            email.popover('show');
            return false;
        }
        else if(!email.val().match(/^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i)){
            email.focus();
            email.popover('show');
            return false;
        }
        else{
            email.popover('hide');
            return true;
        }
    }

    // Perdida de foco
        nombre.blur(validateUsername);
        email.blur(validateEmail);

    // Envio de formulario

    $("#form_contacto").submit(function( event ){
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'forms/contacto.php',
            data: $(this).serialize(),
            success: function(data){
                $("#respuesta").slideDown();
                $("#respuesta").html(data);
                $('#respuesta2').modal('show');
                document.getElementById('form_contacto').reset();
            }
        });

        return false;
    });

});
