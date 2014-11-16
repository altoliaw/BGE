<?php
//===================================
//	Date			:20141114
//	Auther			:Nick
//	Description	:Sever Socket for connetion. Please resident this file in command line
//===================================
require_once "Class/SocketServer.php";
require_once "Class/Players.php";
require_once "Class/TablesInformation.php";
require_once "Class/PageFunction.php";


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
//Test start
$obj_TablesInformation->SetTablesInformation(new Players("123451","1","0"));
$obj_TablesInformation->SetTablesInformation(new Players("123452","1","1"));
$obj_TablesInformation->SetTablesInformation(new Players("123453","1","2"));
$obj_TablesInformation->SetTablesInformation(new Players("123454","1","3"));
$obj_TablesInformation->SetTablesInformation(new Players("123455","1","4"));
$obj_TablesInformation->SetTablesInformation(new Players("123456","1","5"));
$obj_TablesInformation->SetTablesInformation(new Players("123457","1","6"));
$obj_TablesInformation->SetTablesInformation(new Players("123458","1","7"));
//Test end


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
