<?php
	session_start();
	$_SESSION['Bool_IsReady'] = !$_SESSION['Bool_IsReady'];
	$Int_Status['success'] = 1;
	echo json_encode($Int_Status);
?>