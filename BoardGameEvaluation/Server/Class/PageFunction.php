<?php
class PageFunction{
		function PageFunction(){	
		}
		
		function ImplementFunction($objarr_GET, &$obj_TablesInformation){
			$strarr_Output=array();
			if(array_key_exists("target",$objarr_GET) ==false && array_key_exists("type",$objarr_GET) ==false){
				die("Error parameter in target");
			}
			switch($objarr_GET["target"]){
				// roomisfull case
				case "roomisfull": 
					if(array_key_exists("roomid",$objarr_GET) &&$objarr_GET["type"]=="read" ){
						$strarr_Output						=$obj_TablesInformation->GetAllTablesFullStatusForJsonArray();
					}
				break;
				
				
				default:
				break;				
			}
			return $strarr_Output;
		}
}
?>
