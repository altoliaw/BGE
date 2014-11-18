<?php
class CardStack{
	private $int_TotalNumberOfPoker;
	private $intarr_PokerStack;
	private $intarr_PokerDiscardStack;
	private $intarr_PlayCardsStack;
	
	function CardStack($int_TotalNumberOfPoker){
			$this->int_TotalNumberOfPoker=$int_TotalNumberOfPoker;
			//Play cards stack . The results of the Stack is array(array("CardId"=>$int_CardId,"Guid"=>$str_UserGuid,"IsAnswer"=>$bool_IsPlayForTheTeller,"VotedMan"=>$strarr_VotedPeople));
			$this->intarr_PlayCardsStack				=array();
			
			//Generate the number of pokers; index is starting from 0 and the value is starting from 1
			$this->intarr_PokerStack					=array();
			$this->intarr_PokerDiscardStack		=array();
			for($i=0;$i<$int_TotalNumberOfPoker;$i++){
				$this->intarr_PokerDiscardStack[]=($i+1);	
			}
			var_dump($this->intarr_PokerDiscardStack);			
	}
	
	function ShufflePoker(){
		try{
			shuffle($this->intarr_PokerDiscardStack);
			$this->intarr_PokerStack					=array_merge($this->intarr_PokerStack,$this->intarr_PokerDiscardStack);
			$this->intarr_PokerDiscardStack		=array();
		}
		catch(Exception $obj_Ex){
		}		
	}
	
	function GetPokerStack(){
		return $this->intarr_PokerStack;
	}
	
	function GetDiscardPokerStack(){
		return $this->intarr_PokerDiscardStack;
	}
	
	function DrawACard($int_PlayerCount){
		$intarr_CardGroup=array();
		if(count($this->intarr_PokerStack) <= $int_PlayerCount){
			$this->ShufflePoker();
		}
		$intarr_CardGroup									=array_splice($this->intarr_PokerStack,0,$int_PlayerCount);
		return $intarr_CardGroup;		
	}
	
	function CollectDiscardCard($intarr_PokerDiscardStack){
		$this->intarr_PokerDiscardStack			=array_merge($this->intarr_PokerDiscardStack,$intarr_PokerDiscardStack);
	}
	
	function RecycleOneManCards($intarr_Card){
		$this->CollectDiscardCard($intarr_Card);
	}
	
	function CheckCardReady($strarr_Guid){
		$bool_IsPlayACard									=true;
		foreach($strarr_Guid as $key =>$value){
			$bool_EachElementStatus					=false;
			foreach($this->intarr_PlayCardsStack as $key2 =>$value2){
				if($value2["Guid"] ==$value){
					$bool_EachElementStatus			=true;
				}				
			}
			$bool_IsPlayACard								=$bool_IsPlayACard & $bool_EachElementStatus;
		}
		return $bool_IsPlayACard;
	}
	
	function PlayACardsIntoPlayCardsStack($int_CardId,$str_UserGuid,$bool_IsPlayForTheTeller){
		$this->intarr_PlayCardsStack[]				=array("CardId"=>$int_CardId,"Guid"=>$str_UserGuid,"IsAnswer"=>$bool_IsPlayForTheTeller,"VotedMan"=>array());
	}
	
	function RecyclePlayCards(){
		$intarr_DiscardCard								=array();
		foreach($this->intarr_PlayCardsStack as $key =>$value){
			$intarr_DiscardCard[]						=$value["CardId"];			
		}
		$this->CollectDiscardCard($intarr_DiscardCard);
		$this->intarr_PlayCardsStack					=array();
	}
}
?>
