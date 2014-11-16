<?php
class Players{
	private $str_PlayerGuid;
	private $int_RoomId;	
	private $int_SeatOrder;
	private $bool_JoinStaus;
	private $bool_IsMainTeller;
	private $bool_DrawACardStaus;
	private $intarr_PokeStack;	
	
	function Players($str_PlayerGuid){
		$this->str_PlayerGuid								=$str_PlayerGuid;
		$this->int_RoomId									=0;	
		$this->int_SeatOrder								=0;
		$this->bool_JoinStaus							=false;		
		$this->bool_IsMainTeller						=false;
		$this->bool_DrawACardStaus				=false;
		$this->intarr_PokeStack							=array();		
	}
	
	function CheckPlayer($str_PlayerGuid){
		if($this->str_PlayerGuid==$str_PlayerGuid)
			return true;
		else
			return false;
	}
	
	function GetJoinStatus(){
		return  $this->bool_JoinStaus;
	}
}
?>
