<?php
	session_start();
	$_SESSION['Int_DebugCount'] ++;
	$Int_ReadyMax = $_SESSION['Int_DebugCount'];
	$Int_UserOrder = $_SESSION['Int_DebugOrder'];


	$Bool_IsReady = $_SESSION['Bool_IsReady'];
	for ($i = 0 ; $i < 6 ; $i ++) {
		if (($Bool_IsReady || $Int_UserOrder != $i) && $Int_ReadyMax > $i) {
			$ArrayInt_Full[$i]['ready'] = 1;
		} else {
			$ArrayInt_Full[$i]['ready'] = 0;
		}
	}

	$ArrayInt_Full[0]['placeHolder'] = 1;
	$ArrayInt_Full[1]['placeHolder'] = 1;
	$ArrayInt_Full[2]['placeHolder'] = 1;
	$ArrayInt_Full[3]['placeHolder'] = 1;
	$ArrayInt_Full[4]['placeHolder'] = 1;
	$ArrayInt_Full[5]['placeHolder'] = 1;
	$ArrayInt_Full[6]['placeHolder'] = 0;
	$ArrayInt_Full[7]['placeHolder'] = 0;
	echo json_encode($ArrayInt_Full);
?>