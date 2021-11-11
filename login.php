<?php
session_start();
$login=$_POST['login'];
$password=$_POST['pass'];

if (($login=='admin') && ($password=="123")) {
    $_SESSION['auth']=true;
    $_SESSION['username']='admin';
};

header('Location: /index.php');
?>