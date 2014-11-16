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
		
		function SetTablesInformation($obj_Palyer){
			$bool_IsExistRoom							=array_key_exists(($obj_Palyer->GetRoomId()-1),$this->objarr_TablesInformation);
			if($bool_IsExistRoom== true){
				$bool_IsExistMan							=false;
				$objarr_PlayersSet							=&$this->objarr_TablesInformation[($obj_Palyer->GetRoomId()-1)];// This is call by ref.
				for($i=0;$i<count($objarr_PlayersSet);$i++){
					if($objarr_PlayersSet[$i]->GetPlayerGuid()==$obj_Palyer->GetPlayerGuid()){
						$bool_IsExistMan					=true;
						$objarr_PlayersSet[$i]			=$obj_Palyer;
						break;
					}
				}
				
				//If There is no guid man in this table
				if($bool_IsExistMan ==false){
					//Is full men in this table?
					if(count($objarr_PlayersSet)<$this->int_MaximunManInTable){
						$objarr_PlayersSet[]=$obj_Palyer;
					}					
				} 
			}
			else{
				$this->objarr_TablesInformation[($obj_Palyer->GetRoomId()-1)]=array($obj_Palyer);
			}			
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
}
?>
