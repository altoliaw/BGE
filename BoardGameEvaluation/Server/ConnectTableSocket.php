<?php
//===================================
//	Date			:20141114
//	Auther			:Nick
//	Description	:Sever Socket for imediate connetion. 
//===================================
require_once "Class/SocketServer.php";

$obj_SocketInfo	= new SocketServer();

//Receive the message from client
$str_Message=$_GET["Messasge"];

// Create socket
$obj_Socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Can not create socket");

// Connect to socket
$obj_Connection = socket_connect($obj_Socket, $obj_SocketInfo->GetSocketInfo()['Server'], $obj_SocketInfo->GetSocketInfo()['Port']) or die("Soket server is not opening");

// Write to socket server
socket_write($obj_Socket, $str_Message, strlen($str_Message)) or die("Can not send data to server\n");

// Read the results form server
$str_Result = socket_read ($obj_Socket, 1024) or die("Could not read server response\n");

//Layout for client page
echo $str_Result;

socket_close($obj_Socket);
?>
