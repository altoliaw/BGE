<?php
	require_once "Class/Guid.php";
	
	$str_CallBack					=$_GET['callback'];
	$obj_Guid						=new Guid();
	$strarr_Guid["Guid"]	=$obj_Guid->GetGuid();
	$obj_Json 						= json_encode($strarr_Guid) ;
	echo sprintf('%s(%s)', $str_CallBack, $obj_Json) ;
?>
