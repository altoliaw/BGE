<?php
class Players{
	private $str_PlayerGuid;
	private $int_RoomId;	
	private $int_SeatOrder;
	private $bool_JoinStaus;
	private $bool_IsMainTeller;
	private $bool_DrawACardStaus;
	private $intarr_PokeStack;	
	
	function Players($str_PlayerGuid,$int_RoomId=-1,$int_SeatOrder=-1){
		$this->str_PlayerGuid								=$str_PlayerGuid;
		$this->int_RoomId									=$int_RoomId;	
		$this->int_SeatOrder								=$int_SeatOrder;
		$this->bool_JoinStaus							=false;		
		$this->bool_IsMainTeller						=false;
		$this->bool_DrawACardStaus				=false;
		$this->intarr_PokeStack							=array();		
	}
	
	function GetRoomId(){
		return $this->int_RoomId	;
	}
	
	function GetPlayerGuid(){
			return $this->str_PlayerGuid;
	}
	
	function CheckPlayer($str_PlayerGuid){
		if($this->str_PlayerGuid==$str_PlayerGuid)
			return true;
		else
			return false;
	}
	
	function GetSeatOrder(){
			return $this->int_SeatOrder;
	}
	
	function GetJoinStatus(){
		return  $this->bool_JoinStaus;
	}
}
?>
