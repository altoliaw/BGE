<?php
	session_start();
	$_SESSION['Int_DebugCount'] = 0;
	if ($_GET['Bool_IsTellerProcess']) {
		$_SESSION['Int_DebugOrder'] = 0;
	} else {
		$_SESSION['Int_DebugOrder'] = 1;
	}


	$_SESSION['Bool_IsReady'] = false;
	if ($_GET['Bool_IsTellerProcess']) {
		$ArrayInt_Order['order'] = 0;
	} else {
		$ArrayInt_Order['order'] = 1;
	}
	echo json_encode($ArrayInt_Order);
?>