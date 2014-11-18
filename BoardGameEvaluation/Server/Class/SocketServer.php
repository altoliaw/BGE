<?php
Class SocketServer{
	private $str_SocketServer	;
	private $str_SocketPort;
	private $obj_Socket;
	private $obj_Listen;
	private $obj_Spawn;
	
	function SocketServer(){
		$this->str_SocketServer							="localhost";
		$this->str_SocketPort								="12345";		
		$this->obj_Listen									="";
		$this->obj_Spawn									="";
		$this->Create();
	}
	
	function GetSocketInfo(){
		return array('Server'=>$this->str_SocketServer,'Port'=>$this->str_SocketPort);
	}
	
	private function Create(){
		$this->obj_Socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Can not create socket\n");
	}
	
	function Connect(){
		$obj_Connection = socket_connect($this->obj_Socket, $this->str_SocketServer, $this->str_SocketPort) or die("Soket server is not opening\n");
	}
	
	function Bind(){
		$obj_Bind = socket_bind($this->obj_Socket, $this->str_SocketServer, $this->str_SocketPort) or die("Can not bind socket\n");
	}
	
	function Listen($int_MaximumSocketListener){
		$this->obj_Listen = socket_listen($this->obj_Socket, $int_MaximumSocketListener) or die("Can not listen socket\n");	
	}
	
	function Accept(){
		$this->obj_Spawn = socket_accept($this->obj_Socket) or die("Could not accept incoming connection\n");	
	}
	
	function Read($int_MaximumSocketLength,$str_Mode=""){
		$obj_GetInformation 							="";
		switch($str_Mode){
			case "s"://for server
				$obj_GetInformation = socket_read($this->obj_Spawn, $int_MaximumSocketLength) or die("Can not read from clent text\n");
			break;
			case "c"://for client
				$obj_GetInformation = socket_read ($this->obj_Socket, $int_MaximumSocketLength) or die("Can not read server response\n");
			break;
			default://for client
				$obj_GetInformation = socket_read ($this->obj_Socket, $int_MaximumSocketLength) or die("Can not read server response\n");
			break;
		}
		return $obj_GetInformation;
	}
	
	function Write($str_Output,$str_Mode=""){
		switch($str_Mode){
			case "s"://for server
				socket_write($this->obj_Spawn, $str_Output, strlen ($str_Output)) or die("Can not output\n");
			break;
			case "c"://for client
				socket_write($this->obj_Socket, $str_Output, strlen($str_Output)) or die("Can not send data to server\n");
			break;
			default://for client
				socket_write($this->obj_Socket, $str_Output, strlen($str_Output)) or die("Can not send data to server\n");
			break;
		}		
	}
	
	function Close($str_Mode=""){
		switch($str_Mode){
			case "s"://for server	
				socket_close($this->obj_Spawn);
				socket_close($this->obj_Socket);
			break;
			case "c"://for client
				socket_close($this->obj_Socket);
			break;
			default://for client
				socket_close($this->obj_Socket);
			break;
		}	
	}
}
?>
