<?php
//===================================
//	Date			:20141114
//	Auther			:Nick
//	Description	:Sever Socket for connetion. Please resident this file in command line
//===================================
require_once "Class/SocketServer.php";
require_once "Class/PageFunction.php";
require_once "Class/TablesInformation.php";

$int_MaximumSocketLength							=133693415;
$int_MaximumSocketListener						=50;
$int_MaximunManInTable							=8;
$int_MaximunTableNumber							=9;

//Start
echo "Start  for resident of PHP\n" ;

//New page function object
$obj_PageFunction										=new  PageFunction();
//New a tableinformation object
$obj_TablesInformation								=new TablesInformation($int_MaximunManInTable,$int_MaximunTableNumber);

$obj_SocketServer	= new SocketServer();
$str_Output="";

//Set the time for timeout
set_time_limit(0);

// Bind socket
$obj_SocketServer->Bind();

//Critical section for listening the scoket
while (true) {
	// Start listening for connections 
	$obj_SocketServer->Listen($int_MaximumSocketListener);

	// accept incoming connections & spawn another socket to handle communication
	$obj_SocketServer->Accept();

	// Read client input 
	$obj_GetInformation									=$obj_SocketServer->Read($int_MaximumSocketLength,"s");
	$objarr_GET												=unserialize($obj_GetInformation);
	
	// LayOut & Custom function
	$strarr_Output											=array();
	$strarr_Output											=$obj_PageFunction->ImplementFunction($objarr_GET,$obj_TablesInformation);
	var_dump($strarr_Output);
	// Write client input
	$str_Output												=serialize($strarr_Output);
	$obj_SocketServer->Write($str_Output,"s");	
}
?>
