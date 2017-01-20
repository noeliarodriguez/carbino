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
    var msj = $("#mensaje");

    function validateUsername(){
        //NO cumple longitud minima
        if(nombre.val().length < 3){
            nombre.addClass("error");
            $("#name").popover('show');
            return false;
        }
        //SI longitud pero NO solo caracteres A-z
        else if(!nombre.val().match(/^[a-zA-Z]+$/)){
            nombre.addClass("error");
            $("#name").popover('show');
            return false;
        }
        // SI longitud, SI caracteres A-z
        else{
            nombre.removeClass("error");
            $("#name").popover('hide');
            return true;
        }
    }

    function validateEmail(){
        //NO hay nada escrito
        if(email.val().length == 0){
            email.addClass("error");
            $("#email").popover('show');
            return false;
        }
        // SI escrito, NO VALIDO email
        else if(!email.val().match(/^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i)){
            email.addClass("error");
            $("#email").popover('show');
            return false;
        }
        // SI rellenado, SI email valido
        else{
            email.removeClass("error");
            $("#email").popover('hide');
            return true;
        }
    }
    function validateMensaje(){
        if(msj.val()==0){
            msj.addClass("error");
            $("#mensaje").popover("show");
            return false;
        }
        else
        {
            msj.removeClass("error");
            $("#mensaje").popover('hide');
            return true;
        }
    }

    //controlamos la validacion en los distintos eventos
    // Perdida de foco
        nombre.blur(validateUsername);
        email.blur(validateEmail);

    // Pulsacion de tecla
     //   nombre.keyup(validateUsername);
     //   email.keyup(validateEmail);

    // Envio de formulario
        $("#form1").submit(function(){
            return !!(validateUsername() & validateEmail() & validateMensaje());
        });



});
