<?php
class Players{
	private $str_PlayerGuid;
	private $int_RoomId;// The first value is starting at 1
	private $int_SeatOrder;// The first value is starting at 0, and 0 is the teller, and others are players
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
	
	function SetSeatOrder($int_SeatOrder){
		$this->int_SeatOrder=$int_SeatOrder;
	}
	
	function GetSeatOrder(){
		return $this->int_SeatOrder;
	}
	function SetJoinStatus($bool_JoinStaus){
		$this->bool_JoinStaus=$bool_JoinStaus;
	}
	
	function GetJoinStatus(){
		return  $this->bool_JoinStaus;
	}
	
	function SetIsTeller($bool_IsMainTeller){
		$this->bool_IsMainTeller						=$bool_IsMainTeller;
	}
	
	function GetIsTeller(){
			return $this->bool_IsMainTeller;
	}
	
	function GetPokeStack(){
		return $this->intarr_PokeStack;
	}
	
	function InsertACard($int_CardNumber){
		$this->intarr_PokeStack[]						=$int_CardNumber;
	}
	
	function CheckIsFullCard($int_MaximumCardNumber){
		$bool_IsFullCard									=false;
		if(count($this->intarr_PokeStack)>=$int_MaximumCardNumber){
			$bool_IsFullCard								=true;
		}
		return $bool_IsFullCard;
	}

}
?>
