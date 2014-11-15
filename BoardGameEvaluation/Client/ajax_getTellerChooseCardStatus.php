<?php
	session_start();
	if (!isset($_SESSION['Int_WaitTeller'])) {
		$_SESSION['Int_WaitTeller'] = 0;
	}
	$_SESSION['Int_WaitTeller'] ++;
	if ($_SESSION['Int_WaitTeller'] > 5) {
		$Int_Status['success'] = 1;
		$_SESSION['Int_WaitTeller'] = 0;
	} else {
		$Int_Status['success'] = 0;
	}
	echo json_encode($Int_Status);
?>