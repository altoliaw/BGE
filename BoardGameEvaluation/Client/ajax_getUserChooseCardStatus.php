<?php
	session_start();
	if (!isset($_SESSION['Int_WaitUser'])) {
		$_SESSION['Int_WaitUser'] = 0;
	}
	$_SESSION['Int_WaitUser'] ++;
	if ($_SESSION['Int_WaitUser'] > 5) {
		$Int_Status['success'] = 1;
		$_SESSION['Int_WaitUser'] = 0;
	} else {
		$Int_Status['success'] = 0;
	}
	echo json_encode($Int_Status);
?>