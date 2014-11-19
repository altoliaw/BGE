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
	
	function GetPlayCardsStack(){
		return $this->intarr_PlayCardsStack;
	}
	
	function GetShufflePlayCardsStack(){
		shuffle($this->intarr_PlayCardsStack);
		return $this->intarr_PlayCardsStack;
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
	
	function CheckPlayACardReadyStatusForAllPlayers($strarr_Guid){
		$boolarr_IsPlayACard							=array();
		$boolarr_IsPlayACard							=array_pad($boolarr_IsPlayACard,count($strarr_Guid),false);	
		foreach($strarr_Guid as $key =>$value){
			foreach($this->intarr_PlayCardsStack as $key2 =>$value2){
				if($value2["Guid"] ==$value){
					$boolarr_IsPlayACard[$key]		=true;
				}				
			}
			if($value	== -1){//No player in the position
				$boolarr_IsPlayACard[$key]			=true;
			}
		}
		return $boolarr_IsPlayACard;
	}
	
	function PlayACardsIntoPlayCardsStack($int_CardId,$str_UserGuid,$bool_IsPlayForTheTeller){
		$this->intarr_PlayCardsStack[]					=array("CardId"=>$int_CardId,"Guid"=>$str_UserGuid,"IsAnswer"=>$bool_IsPlayForTheTeller,"VotedMan"=>array());
	}
	
	function RecyclePlayCards(){
		$intarr_DiscardCard								=array();
		foreach($this->intarr_PlayCardsStack as $key =>$value){
			$intarr_DiscardCard[]						=$value["CardId"];			
		}
		$this->CollectDiscardCard($intarr_DiscardCard);
		$this->intarr_PlayCardsStack					=array();
	}

	function SetVoteCard($int_CardId,$str_VoteMan){
		$bool_IsSuccess										=false;
		$bool_IsPlayerVoted									=false;
		foreach($this->intarr_PlayCardsStack as $key => $value){
			if(in_array($str_VoteMan,$value["VotedMan"],true)==true){
				$bool_IsPlayerVoted							=true;
			}
		}
		
		foreach($this->intarr_PlayCardsStack as $key => &$value){
			if($value["CardId"]==$int_CardId){
				if(in_array($str_VoteMan,$value["VotedMan"],true)==false && $bool_IsPlayerVoted ==false){
					$value["VotedMan"][]					=$str_VoteMan;
					$bool_IsSuccess							=true;
				}
			}
		}
		return $bool_IsSuccess;
	}
	
	function CheckPlayerVotedStatus($strarr_Guid){
		$boolarr_IsPlayerVoted							=array();
		$boolarr_IsPlayerVoted							=array_pad($boolarr_IsPlayerVoted,count($strarr_Guid),false);
		foreach($strarr_Guid as $key =>$value){
			foreach($this->intarr_PlayCardsStack as $key2 => $value2){
				if(in_array($value,$value2["VotedMan"],true)==true){
					$boolarr_IsPlayerVoted[$key]		=true;
				}
			}
		}
		return $boolarr_IsPlayerVoted;
	}
}
?>
