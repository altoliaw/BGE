var options = {
	domain: 'http://59.124.106.119/Server'
} ;

/* Debug */
var Bool_IsTellerProcess;

var Bool_IsTeller;
var UI_Stage;		// #Div_Stage		
var UI_ChooseRoom;	// #Div_ChooseRoom  選擇房間
var UI_Room;		// #Div_Room		房內
var UI_ReadyBtn;	// UI_Room.find("#Btn_ReadyStart")
var UI_LightBox;	// 燈箱效果	
var UI_ShowVoteCardDIV; // 投票
var UI_ShowCardDIV;		// 
var Text_GUID;			// GUID
var Event_RefreshChooseRoomStatus; // Chose Room Status From setTimeout
var Event_RefreshRoomStatus;	   // RoomStatus From setTimeout
var Event_RefreshWaitGameStart;
var Int_AnimationTime = 300;	// AnimationTime
var Int_RefreshTime = 1000;		// Refresh Freq
var Int_RoomID;					// RoomID
var Int_LeastPlayerNum = 3;	// 最少人數設定
var Int_PlayerCount;				//
var Int_ShowGameOrderIndex;
var Int_ShowGameOrderTime = 500;
var Int_ShowCardCount = 5;
var Int_ShowCardIndex = 0;
var Int_ShowCardTime = 500;
var Int_LightBoxProcessTime = 500;
var Int_ChooseCardID;
var ArrayText_SeatCode = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];