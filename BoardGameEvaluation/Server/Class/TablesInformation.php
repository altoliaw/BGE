<?php
//===================================
//	Date			:20141115
//	Auther			:Nick
//	Description	:Table Information. 
//===================================	
class TablesInformation{
		private $objarr_TablesInformation;
		private $int_MaximunManInTable;
		private $int_MaximunTableNumber;
		
		function TablesInformation($int_MaximunManInTable,$int_MaximunTableNumber){
			$this->objarr_TablesInformation		=array();
			$this->int_MaximunManInTable		=$int_MaximunManInTable;
			$this->int_MaximunTableNumber	=$int_MaximunTableNumber;
		}
		
		function SetTablesInformation(&$obj_Player){
			$bool_IsAccessSuccess						=true;
			$intarr_WhoIsOnTheSeat					=$this->GetSeatOrder($obj_Player->GetRoomId());// If the value is -1,  no man is on this seat.			
			//Assign the order of the seat
			if($obj_Player->GetSeatOrder()!=0){// -1 or ther value will the player.
					for($i=1;$i<count($intarr_WhoIsOnTheSeat);$i++){
						if($intarr_WhoIsOnTheSeat[$i]==-1){
								$obj_Player->SetSeatOrder($i);
								break;
						}
						else{
							$obj_Player->SetSeatOrder(-1);
						}
					}
			}
			else{// =0, the teller situation
				$obj_Player->SetSeatOrder(0);
				$obj_Player->SetIsTeller(true);
			}			
			
			if($obj_Player->GetSeatOrder()==-1){// No seat in the table for players (except the teller)
				return $bool_IsAccessSuccess=false;
			}
			
			//Add player into the table
			$bool_IsExistRoom							=array_key_exists(($obj_Player->GetRoomId()-1),$this->objarr_TablesInformation);
			if($bool_IsExistRoom== true){
				$bool_IsExistMan							=false;
				$objarr_PlayersSet							=&$this->objarr_TablesInformation[($obj_Player->GetRoomId()-1)];// This is call by ref.
				for($i=0;$i<count($objarr_PlayersSet);$i++){
					if($objarr_PlayersSet[$i]->GetPlayerGuid()==$obj_Player->GetPlayerGuid()){
						$bool_IsExistMan					=true;							
						$objarr_PlayersSet[$i]			=$obj_Player;// Update the user information						
						break;
					}
				}
				
				//If There is no guid man in this table
				if($bool_IsExistMan ==false){
					//Is full men in this table?
					if(count($objarr_PlayersSet)<$this->int_MaximunManInTable){// Insert the man into an existing table 
						try{						
							$intarr_WhoIsOnTheSeat					=$this->GetSeatOrder($obj_Player->GetRoomId());
							if($intarr_WhoIsOnTheSeat[$obj_Player->GetSeatOrder()]==-1){
								$objarr_PlayersSet[]=$obj_Player;
							}
							else{
								return $bool_IsAccessSuccess=false;
							}
						}
						catch(Exception $obj_Ex){
							return $bool_IsAccessSuccess=false;
						}
					}					
				} 
			}
			else{// For the room which is not existing.
				try{
					$intarr_WhoIsOnTheSeat					=$this->GetSeatOrder($obj_Player->GetRoomId());
					if($intarr_WhoIsOnTheSeat[$obj_Player->GetSeatOrder()]==-1){
						$this->objarr_TablesInformation[($obj_Player->GetRoomId()-1)]=array($obj_Player); //Insert the man into a new table
					}
					else{
						return $bool_IsAccessSuccess=false;
					}				
				}
				catch(Exception $obj_Ex){
					return $bool_IsAccessSuccess=false;
				}
			}
			return $bool_IsAccessSuccess;			
		}
		
		function SetTablesInformationForJsonArray(&$obj_Player){
			$bool_IsSuccess									=false;
			$bool_IsSuccess									=$this->SetTablesInformation($obj_Player);
			return array("success"=>((int)$bool_IsSuccess));
		}
		
		function RemoveTablesInformation($int_TableId,$str_Guid){
			$bool_IsSuccess									=false;
			if(array_key_exists(($int_TableId-1),$this->objarr_TablesInformation)){
				$objarr_PlayerSet							=array();
				$objarr_PlayerSet							=$this->objarr_TablesInformation[($int_TableId-1)];
				$objarr_NewPlayerSet					=array();
				foreach($objarr_PlayerSet as $key =>$value){// $value is a player object
					if($value->GetPlayerGuid()!=$str_Guid){
						$objarr_NewPlayerSet[]			=$value;
					}
					else{
						$bool_IsSuccess						=true;
					}
				}
				$this->objarr_TablesInformation[($int_TableId-1)]	=$objarr_NewPlayerSet;
			}
			return $bool_IsSuccess;
		}
		
		function RemoveTablesInformationForJsonArray($int_TableId,$str_Guid){
			$bool_IsSuccess									=true;
			$bool_IsSuccess									=$this->RemoveTablesInformation($int_TableId,$str_Guid);
			return array("success"=>((int)$bool_IsSuccess));
		}
		
		function GetAllTablesFullStatus(){
			$boolarr_RoomIsEmpty=array();
			$boolarr_RoomIsEmpty=array_pad($boolarr_RoomIsEmpty,$this->int_MaximunTableNumber,true);
			foreach($this->objarr_TablesInformation as $key => $value){
				//$value is the playerSet				
				if(count($value)>=$this->int_MaximunManInTable){
					$boolarr_RoomIsEmpty[$key]=false;
				}
				else{
					$boolarr_RoomIsEmpty[$key]=true;
				}
			}
			return  $boolarr_RoomIsEmpty;	
		}
		
		function GetAllTablesFullStatusForJsonArray(){
			$boolarr_RoomIsEmptyJsonArray		=array();
			$boolarr_RoomIsEmpty= $this->GetAllTablesFullStatus();
			foreach($boolarr_RoomIsEmpty as $key => $value){
				$boolarr_RoomIsEmptyJsonArray[$key]=array("Roomid"=>($key+1),"isAvailable"=>((int)$value));
			}
			return  $boolarr_RoomIsEmptyJsonArray;	
		}

		// The parameter $int_TableId is starting at 1
		function GetSeatOrder($int_TableId){
			$intTableIndex									=($int_TableId-1);
			$intarr_SeatGuid								=array();
			$intarr_SeatGuid								=array_pad($intarr_SeatGuid,$this->int_MaximunManInTable,"-1");
			if(array_key_exists($intTableIndex,$this->objarr_TablesInformation)){
				$objarr_PlayerSet							=$this->objarr_TablesInformation[$intTableIndex];
				foreach($objarr_PlayerSet as $key => $value){// $value is the players object
					if($value->GetIsTeller() ==true && $intarr_SeatGuid[0]=="-1"){
						$intarr_SeatGuid[0]				=$value->GetPlayerGuid();
					}
					else if($value->GetIsTeller()==true && $intarr_SeatGuid[0]!="-1"){
						die("System error, there are two tellers in this game");
					}
					else if($value->GetIsTeller() ==false && array_key_exists($value->GetSeatOrder(),$intarr_SeatGuid) ==true){// Others players & the order is in the array index
						if($intarr_SeatGuid[$value->GetSeatOrder()]=="-1"){
							$intarr_SeatGuid[$value->GetSeatOrder()]=$value->GetPlayerGuid();
						}
						else{
							die("System error, there are two tellers in this game: Repeat players");
						}
					}
					else if($value->GetIsTeller() ==false && array_key_exists($value->GetSeatOrder(),$intarr_SeatGuid) ==false){// Others players
						die("System error, there are two tellers in this game: The player is out of table.");
					}
				}
			}
			return $intarr_SeatGuid;
		}
		
		function GetSeatOrderForJsonArray($int_TableId,$str_Guid){
			$strarr_SeatGuid								=array();
			$intarr_SeatGuid								=array();
			$intarr_SeatGuid								=$this->GetSeatOrder($int_TableId);
			foreach($intarr_SeatGuid as $key =>$value){// value is the string guid; if = -1, there is no man on the seat
				$strarr_SeatGuid[]=array("order"=>chr(($key+65)),"isself"=>($value==$str_Guid?1:0),"isempty"=>($value==-1?1:0));
			}
			return $strarr_SeatGuid;
		}

		function SetPlayerStatus($int_TableId,$str_Guid){
			$bool_IsSuccess									=false;
			if(array_key_exists(($int_TableId-1),$this->objarr_TablesInformation)==true){
				$objarr_PlayerSet							=&$this->objarr_TablesInformation[($int_TableId-1)] ;
				foreach($tobjarr_PlayerSet as $key => &$value){ // $value is the Players
					if($vlaue->GetPlayerGuid()==$str_Guid){
						$value->SetJoinStatus(true);
						$bool_IsSuccess						=true;
						break;
					}
				}
			}
			return $bool_IsSuccess;
		}
		
		function SetPlayerStatusForJsonArray($int_TableId,$str_Guid){
			$bool_IsSuccess									=false;
			$bool_IsSuccess										=$this->SetPlayerStatus($int_TableId,$str_Guid);
			return array("success"=>((int)$bool_IsSuccess));			
		}

		function GetPlayersStatus($int_TableId){
			$strarr_SeatOrder								=array();
			$strarr_SeatOrder								=$this->GetSeatOrder($int_TableId);
			$intarr_PlayerStatus								=array();
			$intarr_PlayerStatus								=array_pad($intarr_PlayerStatus,$this->int_MaximunManInTable,-1);
			if(array_key_exists(($int_TableId-1),$this->objarr_TablesInformation)==true){
				$objarr_PlayerSet							=$this->objarr_TablesInformation[($int_TableId-1)] ;
				foreach($strarr_SeatOrder as $key => $value){ //$value is the order GUID
					if($value !=-1){
						foreach($objarr_PlayerSet as $key2 => $value2){ // $value is the Players
							if($value == $value2 ->GetPlayerGuid()){
								$intarr_PlayerStatus[$key]=(int)($value2->GetJoinStatus());
							}
						}
					}
				}
			}
			return array("SeatOrder"=>$$strarr_SeatOrder,"Status"=>$intarr_PlayerStatus);
		}
		
		function GetPlayersStatusForJsonArray($int_TableId,$str_Guid){
			$intarr_PlayerSeatOrderAndStatus		=array();
			$intarr_PlayerSeatOrderAndStatus		=($this->GetPlayersStatus($int_TableId));
			$intarr_PlayerStaus								=array();
			$intarr_PlayerStaus								=$intarr_PlayerSeatOrderAndStatus["Status"];
			$strarr_SeatOrder								=array();
			$strarr_SeatOrder								=$intarr_PlayerSeatOrderAndStatus["SeatOrder"];
			$strarr_PlayerStaus								=array();
			foreach($intarr_PlayerStaus as $key => $value){ // $value is the status of each man. (bool_JoinStaus) 1:yes, 0:false, -1:empty
				$int_IsEmpty									=0;
				$int_IsSelf										=0;
				$int_IsReady										=-1;
				if($value >=0){
					$int_IsReady									=$value;
					if($strarr_SeatOrder[$key]	== $$str_Guid){
						$int_IsSelf								=1;
					}
				}
				else{
					$int_IsEmpty								=1;
					$int_IsReady									=1;
				}
				$strarr_PlayerStaus[$key]					=array("order"=>(chr($key)+65),"isempty"=>$int_IsEmpty,"isself"=>$int_IsSelf,"isready"=>$int_IsReady);
			}
			return $strarr_PlayerStaus;
		}
}
?>
