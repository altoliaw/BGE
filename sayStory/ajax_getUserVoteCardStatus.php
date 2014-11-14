<?php
	session_start();
	if (!isset($_SESSION['Int_WaitUserVote'])) {
		$_SESSION['Int_WaitUserVote'] = 0;
	}
	$_SESSION['Int_WaitUserVote'] ++;
	if ($_SESSION['Int_WaitUserVote'] > 5) {
		$Int_Status['success'] = 1;
		$_SESSION['Int_WaitUserVote'] = 0;
	} else {
		$Int_Status['success'] = 0;
	}
	echo json_encode($Int_Status);
?>