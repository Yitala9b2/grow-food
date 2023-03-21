<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST); // берем данные с клиента и превращаем их в строку и показывает на клиенте