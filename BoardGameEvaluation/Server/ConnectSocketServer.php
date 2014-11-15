<?php
//===================================
//	Date			:20141114
//	Auther			:Nick
//	Description	:Sever Socket for connetion. Please resident this file in command line
//===================================
require_once "Class/SocketServer.php";

echo 'start' ;

$obj_SocketInfo	= new SocketServer();
$str_Output="";

//Set the time for timeout
set_time_limit(0);

// Create socket
$obj_Socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Can not create socket");

// Bind socket
$obj_Bind = socket_bind($obj_Socket, $obj_SocketInfo->GetSocketInfo()['Server'], $obj_SocketInfo->GetSocketInfo()['Port']) or die("Can not bind socket");

//Critical section for listening the scoket
while (true) {
// Start listening for connections 第一個是監聽通道
$obj_Listen = socket_listen($obj_Socket, 3) or die("Can not listen socket");

// accept incoming connections
// spawn another socket to handle communication
$obj_Spawn = socket_accept($obj_Socket) or die("Could not accept incoming connection");

// read client input 獲取client資訊
$obj_GetInformation = socket_read($obj_Spawn, 1024) or die("Can not read from clent text");


//LayOut
$str_Output=$str_Output.($obj_GetInformation." the result for server\n");
socket_write($obj_Spawn, $str_Output, strlen ($str_Output)) or die("Can not output");
}
?>
