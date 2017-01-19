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

});
