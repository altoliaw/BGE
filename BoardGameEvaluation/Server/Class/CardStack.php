<?php
class CardStack{
	private $int_TotalNumberOfPoker;
	private $intarr_PokerStack;
	private $intarr_PokerDiscardStack;
	
	function CardStack($int_TotalNumberOfPoker){
			$this->int_TotalNumberOfPoker=$int_TotalNumberOfPoker;
			//Generate the number of pokers
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
}
?>
