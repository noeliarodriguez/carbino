<?php

require 'PHPMailerAutoload.php';

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
    else if(!preg_match("/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/", $name))
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

if($_SERVER["REQUEST_METHOD"] == "POST")
{
        $nombre = filtro($_POST["name"]);
        $email = filtro($_POST["email"]);
        $mensaje = filtro($_POST["mensaje"]);

        $bSt = false;

        if(validateEmail($email) and validateUsername($nombre))
            $bSt = true;

        if($bSt)
        {

            $mail = new PHPMailer;

            $mail->setFrom($email, $nombre,false);
            $mail->addAddress('info@carbinodistribuidora.com', 'Distribuidora Carbino');
            $mail->addReplyTo($email, $nombre);
            $mail->addCC('jperez@carbinodistribuidora.com');
            $mail->addCC('amorello@carbinodistribuidora.com');

            $mail->isHTML(true);

            $mail->Subject = 'Contacto desde web Distribuidora Carbino';
            $mail->Body    = "<strong>Has recibido un e-mail desde la web www.carbinodistribuidora.com</strong>
                                <p>Datos:</p>
                                <ul>
                                   <li>Nombre: $nombre</li>
                                   <li>Email: $email</li>
                                </ul>
                                <h3>Mensaje:</h3>
                                <p>$mensaje</p>";
            $mail->AltBody = "Has recibido un e-mail desde la web www.carbinodistribuidora.com. Nombre: $nombre. Email: $email. Mensaje: $mensaje";

            if($mail->send()) {
                echo '<div class="modal fade" id="respuesta2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="alert alert-success alert-dismissable">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                                <strong>Su mensaje ha sido enviado correctamente.</strong>
                            </div>    
                        </div>
                     </div>';
            } else {
                echo '<div class="modal fade" id="respuesta2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                                <strong>Error, intenta mas tarde</strong>
                            </div>    
                          </div>
                      </div>';
            }


        }


}


?>