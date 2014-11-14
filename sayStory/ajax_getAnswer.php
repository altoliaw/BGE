<?php
	$ArrayInt_Answer[0]['card'] = 5;
	$ArrayInt_Answer[0]['people'][] = 1;
	$ArrayInt_Answer[1]['people'][] = 2;
	$ArrayInt_Answer[1]['card'] = 6;
	$ArrayInt_Answer[2]['people'][] = 3;
	$ArrayInt_Answer[2]['card'] = 2;
	$ArrayInt_Answer[3]['card'] = 8;
	$ArrayInt_Answer[3]['people'][] = 4;
	$ArrayInt_Answer[3]['people'][] = 5;
	$ArrayInt_Answer[4]['card'] = 9;
	$ArrayInt_Answer[5]['card'] = 10;
	$ArrayInt_Answer[5]['people'][] = 0;
	echo json_encode($ArrayInt_Answer);
?>