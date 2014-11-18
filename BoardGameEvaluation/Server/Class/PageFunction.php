<?php
class PageFunction{
		function PageFunction(){	
		}
		
		function ImplementFunction($objarr_GET, &$obj_TablesInformation){
			$strarr_Output=array();
			if(array_key_exists("target",$objarr_GET) ==false && array_key_exists("type",$objarr_GET) ==false){
				$strarr_Output=array("error"=>"notarget");
			}
			else{
				switch($objarr_GET["target"]){
					// roomisfull case
					case "hallroomstatus": 
						if($objarr_GET["type"]=="read" ){
							$strarr_Output						=$obj_TablesInformation->GetAllTablesFullStatusForJsonArray();
						}
					break;
					case "playerjoin": 
						if($objarr_GET["type"]=="write"  && array_key_exists("roomid",$objarr_GET) && array_key_exists("guid",$objarr_GET) && array_key_exists("act",$objarr_GET) ){
							if($objarr_GET["act"]=="join" && array_key_exists("role",$objarr_GET)){
								$int_BodyId						=-1;
								if($objarr_GET["role"]=="teller"){
									$int_BodyId					=0;
								}							
								$strarr_Output					=$obj_TablesInformation->SetTablesInformationForJsonArray(new Players($objarr_GET["guid"],((int)$objarr_GET["roomid"]),$int_BodyId));
							}
							else if($objarr_GET["act"]=="leave"){
								$strarr_Output					=$obj_TablesInformation->RemoveTablesInformationForJsonArray(((int)$objarr_GET["roomid"]),$objarr_GET["guid"]);
							}
						}
					break;				
					case "playerorder":
						if($objarr_GET["type"]=="read" && array_key_exists("roomid",$objarr_GET) && array_key_exists("guid",$objarr_GET)){
							$strarr_Output							=$obj_TablesInformation->GetSeatOrderForJsonArray($objarr_GET["roomid"],$objarr_GET["guid"]);
						}
					break;
					case "playerready":
						if($objarr_GET["type"]=="read" && array_key_exists("roomid",$objarr_GET) && array_key_exists("guid",$objarr_GET)){
							$strarr_Output							=$obj_TablesInformation->GetPlayersStatusForJsonArray($objarr_GET["roomid"],$objarr_GET["guid"]);
						}
						else if($objarr_GET["type"]=="write" && array_key_exists("roomid",$objarr_GET) && array_key_exists("guid",$objarr_GET)){
							$strarr_Output							=$obj_TablesInformation->SetPlayerStatusForJsonArray($objarr_GET["roomid"],$objarr_GET["guid"]);
						}
					break;	
					case "gamestart":						
						if($objarr_GET["type"]=="write" && array_key_exists("roomid",$objarr_GET) && array_key_exists("guid",$objarr_GET)){
							$strarr_Output							=$obj_TablesInformation->SetPlayerStatusForJsonArray($objarr_GET["roomid"],$objarr_GET["guid"]);
						}
					break;	
					case "cardstack":
						if($objarr_GET["type"]=="read" && array_key_exists("roomid",$objarr_GET) && array_key_exists("guid",$objarr_GET)){
						}
					break;
								
					default:
						$strarr_Output=array("error"=>"targetnotfound");
					break;				
				}				
			}
			return $strarr_Output;
		}
}
?>
