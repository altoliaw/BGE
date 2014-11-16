<?php
require_once "../../Class/CardStack.php";
$obj_CardStack 												=new CardStack(30);
$obj_CardStack ->ShufflePoker();
var_dump($obj_CardStack->GetPokerStack());
var_dump($obj_CardStack->GetDiscardPokerStack());
$intarr_DisCard=array();
var_dump($intarr_DisCard							=$obj_CardStack->DrawACard(5));
var_dump($obj_CardStack->DrawACard(5));
$obj_CardStack->CollectDiscardCard($intarr_DisCard);
var_dump($obj_CardStack->GetPokerStack());
var_dump($obj_CardStack->GetDiscardPokerStack());	
?>
