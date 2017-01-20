<?php

if($_SERVER['REQUEST_METHOD'] == "POST")
{
    if(isset($_POST['submit']))
    {
        $nombre = filtro($_POST["name"]);
        $mail = filtro($_POST["email"]);
        $mensaje = filtro($_POST["mensaje"]);

        $bSt = false;

        if(validateEmail($mail) and validateUsername($nombre))
            $bSt = true;

        if(!$bSt)
        {

            $to = 'info@carbinodistribuidora.com';
            $email_subject = "Contacto web,  $nombre";

            $email_body =
                "<strong>Has recibido un e-mail desde la web www.carbinodistribuidora.com</strong>
                <p>Lo siguiente son los detalles:</p>
                <ul>
                   <li>Nombre: $nombre</li>
                   <li>Email: $mail</li>
                </ul>
                <h3>Mensaje:</h3>
                <p>$mensaje</p>";

            $from = "carbinodistribuidora.com";
            define ( "MAIL_HEADERS", "From: $from\nReply-To: $from\nContent-type: text/html\nX-Mailer: PHP/" . phpversion ( ) . "" );

            if(!mail($to,$email_subject,$email_body,MAIL_HEADERS))
                $bSt = false;
        }
    }
}

function filtro($data){
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validateUsername($name){
    //NO cumple longitud minima
    if(strlen($name) < 4)
        return false;
    //SI longitud pero NO solo caracteres A-z
    else if(!preg_match("/^[a-zA-Z]+$/", $name))
        return false;
    // SI longitud, SI caracteres A-z
    else
        return true;
}

function validateEmail($email){
    //NO hay nada escrito
    if(strlen($email) == 0)
        return false;
    // SI escrito, NO VALIDO email
    else if(!filter_var($_POST['email'], FILTER_SANITIZE_EMAIL))
        return false;
    // SI rellenado, SI email valido
    else
        return true;
}


?>