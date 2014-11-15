<?php
Class SocketServer{
		private $str_SocketServer		="localhost";
		private $str_SocketPort		="12345";
		
	function GetSocketInfo(){
			return array('Server'=>$this->str_SocketServer,'Port'=>$this->str_SocketPort);
		}
}
?>
