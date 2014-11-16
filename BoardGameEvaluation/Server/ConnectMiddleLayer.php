<?php
//===================================
//	Date			:20141114
//	Auther			:Nick
//	Description	:Sever Socket for imediate connetion. 
//===================================
require_once "Class/SocketServer.php";
$int_MaximumSocketLength							=133693415;
$str_CallBack					=$_GET['callback'];

//Receive the message from client
$str_Message=serialize($_GET);

// Create socket
$obj_SocketServer											= new SocketServer();

// Connect to socket
$obj_SocketServer->Connect();

// Write to socket server
$obj_SocketServer->Write($str_Message);

// Read the results form server
$str_Result														=$obj_SocketServer->Read($int_MaximumSocketLength);

//Layout for client page
$strarr_Result													=unserialize($str_Result);

$obj_Json 						= json_encode($strarr_Result) ;
echo sprintf('%s(%s)',$str_CallBack, $obj_Json) ;

// Close socket
$obj_SocketServer->Close();
?>
