//API list
/*
1. getGUID       - parameter: none
2. getRoomStatus - parameter: none

*/
var options = {
	domain: 'http://59.124.106.119/Server'
} ;


var API = {
	GUID: {
		get: function(){
			return $.ajax({
				url: options.domain + '/GetGuid.php',
				dataType: 'jsonp',
				type: 'GET',
				jsonp: 'callback',
				jsonpCallback: 'jsonp_getGUID',
				cache: false
			}) ;
		}
	},
	ChooseRoomStatus: {
		get: function(){
			return $.ajax({
				url: 'ajax_getChooseRoomStatus.php',
				dataType: 'jsonp',
				type: 'GET',
				jsonp: 'callback',
				jsonpCallback: 'jsonp_getChooseRoomStatus',
				cache: false
			}) ;
		}
	},
	checkRoomStatus: {
		get: function(opt){
			return $.ajax({
				url: 'ajax_checkRoomStatus.php?' + opt.Int_RoomID,
				dataType: 'jsonp',
				type: 'GET',
				jsonp: 'callback',
				jsonpCallback: 'jsonp_getChooseRoomStatus',
				cache: false
			}) ;
		}
	}
} ;
/*
$.get("ajax_getRoomStatus.php", { Int_RoomID: Int_RoomID }, function (data) {
$.get("ajax_setGameStart.php", { Int_RoomID: Int_RoomID}, function (data){
$.get("ajax_waitGameStart.php", { Int_RoomID: Int_RoomID}, function (data){
$.get("ajax_getShowGameOrder.php", { Int_RoomID : Int_RoomID },function (data) {
$.get("ajax_decideCard.php",{Int_RoomID : Int_RoomID, Int_ChooseCardID : Int_ChooseCardID,}
$.get("ajax_getUserChooseCardStatus.php", { Int_RoomID : Int_RoomID }, function (data) {
$.get("ajax_getTellerChooseCardStatus.php", { Int_RoomID : Int_RoomID }, function (data) {
$.get("ajax_getVoteCard.php", { Int_RoomID : Int_RoomID }, function (data) {
$.get("ajax_getUserVoteCardStatus.php", {Int_RoomID : Int_RoomID}, function (data) {
$.get("ajax_setVoteCard.php" , {Int_VoteID : Int_VoteID}, function (data) {
$.get("ajax_getAnswer.php", { Int_RoomID : Int_RoomID }, function (data) {
$.get("ajax_getShowCard.php", {Int_RoomID : Int_RoomID,Int_RoomOrder : Int_RoomOrder}
$.get("ajax_getUserOrder.php", 	{ Int_RoomID: Int_RoomID, Bool_IsTellerProcess : (Bool_IsTellerProcess == true ? 1 : 0) },
$.get("ajax_getShowCard.php", {Int_RoomID : Int_RoomID,Int_RoomOrder : Int_RoomOrder},
*/


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
var Int_RefreshTime = 500;		// Refresh Freq
var Int_RoomID;					// RoomID
var Int_RoomOrder;			
var Int_CheckRoomIsReadyStart = 7;	// 足夠人數設定
var Int_PlayerCount;				//
var Int_ShowGameOrderIndex;
var Int_ShowGameOrderTime = 500;
var Int_ShowCardCount = 5;
var Int_ShowCardIndex = 0;
var Int_ShowCardTime = 500;
var Int_LightBoxProcessTime = 500;
var Int_ChooseCardID;

var ArrayText_SeatCode = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H');

$(function () {

	// Step1. setGUID 
	var setGUID =  (function () {
		if (localStorage.GUID == null) {
			API.GUID.get()
				.done(function (data) {
					Text_GUID = data.Guid;
					localStorage.setItem("GUID", Text_GUID);
				});
		} else {
			Text_GUID = localStorage.GUID;
		}
	})() ;

	UI_Stage = $("#Div_Stage") ;
	UI_Stage
		// Press Start 進入選擇房間
		.on("click", "#Btn_Start", function(){
			UI_Stage.fadeOut(Int_AnimationTime, function(){
				// 版型
				var tables = '' 
				for (var i = 0 ; i < 9 ; i++) 
	　			{
	　				tables += '<td data-id="<' + i + '">第&nbsp;' + (i + 1) + '&nbsp;桌</td>' ;
	　				if ((i+1) % 3 == 0  && i != 8) tables += '</tr><tr>' ;
	　			}			

				var tpl = '<div id="Div_ChooseRoom">' +
			　　　　　　	'<table>' +
			　　　　　　		'<tr>' +
								tables +
			　　　　　　		'</tr>' +
			　　　　　　	'</table>' +
			　　　　　　	'<div id="Div_ChooseRoomBtn">' +
			　　　　　　		'<button id="Btn_ChooseRoomByTeller" data-identity="teller" class="ui-btn ui-btn-inline">說書人</button>' +
			　　　　　　		'<button id="Btn_ChooseRoomByUser" data-identity="user" class="ui-btn ui-btn-inline">一般玩家</button>' +
			　　　　　　	'</div>' +
			　　　　　　'</div>' ;
			
				UI_Stage.html(tpl);
				UI_ChooseRoom = $("#Div_ChooseRoom");
				getChooseRoomStatus();
				startStage();
			}) ;
		})
		// 選擇房間
		.on("click", "#Div_ChooseRoom td", function(){
			if ($(this).attr("class") != "roomIsFull") {
				$(this).parents().find("td").removeClass("roomIsChoose");
				$(this).addClass("roomIsChoose");
			}
		})
		// 選擇說書人或是一般
		.on("click", "#Btn_ChooseRoomByTeller, #Btn_ChooseRoomByUser", function(e){
			var UI_ChooseRoom = UI_Stage.find(".roomIsChoose");
			var Bool_IsChoose = UI_Stage.find(".roomIsChoose").length == 1;

			if (Bool_IsChoose) {
				// Debug
				Bool_IsTellerProcess = $(this).attr("id").indexOf('Teller') != -1;

				// 當下再檢查
				var Int_RoomIDtmp = UI_ChooseRoom.data("id") ;
				
				API.checkRoomStatus.get({ Int_RoomID: Int_RoomIDtmp })
					.done(function(data){
						if (data.success == 1) {
							clearTimeout(Event_RefreshChooseRoomStatus);
							Int_RoomID = Int_RoomIDtmp;

							getUserOrder();
						} else {
							alert("第" + (Int_RoomIDtmp + 1) + "桌已滿！");
						}
					});
			} else {
				alert("請先選擇");
			}
		})
		// 準備開始, 說書人一般共用
		.on("click", "#Btn_ReadyStart", function(e){
			$.get(
				"ajax_setReady.php",
				{ 
					Int_RoomID: Int_RoomID,
					Int_RoomOrder: Int_RoomOrder
				},
				function (data) {
					UI_ReadyBtn.attr("disabled", true);
					if (Bool_IsTeller) {
						// Start Game
						$.get("ajax_setGameStart.php", { Int_RoomID: Int_RoomID}, function (data){
							if (data.success == 1) {
								clearTimeout(Event_RefreshRoomStatus);
								enterShowGameOrder();
							}
						}, 'JSON');
					} else {

						// 一般玩家 Wait
						$.get("ajax_waitGameStart.php", { Int_RoomID: Int_RoomID}, function (data){
							if (data.success == 1) {
								clearTimeout(Event_RefreshRoomStatus);
								clearTimeout(Event_RefreshWaitGameStart);
								enterShowGameOrder();
								return;
							}
							Event_RefreshWaitGameStart = setTimeout(waitGameStart, Int_RefreshTime);
						}, 'JSON');
					}
				},
				'JSON'
			);
		})
		// 猜說書人牌階段的按鈕
		.on("click", ".voteCard button", voteCard) ;

	UI_LightBox = $("#Div_LightBox");
	UI_LightBox
		// 確定送出-題目
		.on("click", "#Btn_DecideChooseCard", decideChooseCard)
		// 取消卡片-題目
		.on("click", "#Btn_CancelChooseCard", function(){
			UI_LightBox.fadeOut(Int_LightBoxProcessTime);
		});
});



// 進入Stage與離開Stage用。
function clearStage () {
	UI_Stage.fadeOut(Int_AnimationTime);
}

function startStage () {
	UI_Stage.fadeIn(Int_AnimationTime);
}

// 持續檢查 RoomStatus
function getChooseRoomStatus () {
	API.ChooseRoomStatus.get()
		.done(function (data) {
			UI_ChooseRoom.find("table td").removeClass("roomIsFull");
			for (var i in data) {
				UI_ChooseRoom.find("table td").eq(data[i])
				.removeClass("roomIsChoose")
				.addClass("roomIsFull");
			}
		});

		Event_RefreshChooseRoomStatus = setTimeout(getChooseRoomStatus, Int_RefreshTime);
}



function getUserOrder () {
	$.get(
		"ajax_getUserOrder.php", 
		{ 
			Int_RoomID: Int_RoomID, 
			Bool_IsTellerProcess : (Bool_IsTellerProcess == true ? 1 : 0) 
		},
		function (data){
			Int_RoomOrder = parseInt(data.order);
			Bool_IsTeller = Int_RoomOrder == 0;
			clearStage();
			setTimeout(function () {
				getRoomDiv();
			}, Int_AnimationTime);
		},
		'JSON'
	);
}

function getRoomDiv () {
	$.get("ui_Room.php", function (data) {
		UI_Stage.html(data);
		UI_Room = $("#Div_Room");
		UI_ReadyBtn = UI_Room.find("#Btn_ReadyStart");
		if (Int_RoomOrder == 0) {
			UI_ReadyBtn.text("開始").attr("disabled", true);
		}
		getRoomStatus();
		startStage();
	});
}

// 持續檢查 房間是否可開始
function getRoomStatus () {
	$.get("ajax_getRoomStatus.php", { Int_RoomID: Int_RoomID }, function (data) {
		UI_Room.find(".isYou").removeClass("isYou");
		for (var i in data) {
			var UI_NowTd = UI_Room.find("table td").eq(i);
			if (parseInt(data[i]['placeHolder']) == 1) {
				UI_NowTd.text(ArrayText_SeatCode[i]);
				if (parseInt(data[i]['ready']) == 1) {
					UI_NowTd.addClass("isReady");
				} else if (i == Int_RoomOrder) {
					UI_NowTd.addClass("isYou");
				} else {
					UI_NowTd.addClass("isSit");
				}
				continue;
			}
			UI_NowTd.text(parseInt(i) + 1).addClass("isNotSit");
		}
		checkReadyStart();
	}, 'json');
	Event_RefreshRoomStatus = setTimeout(getRoomStatus, Int_RefreshTime);
}

function checkReadyStart() {
	if (Bool_IsTeller) {
		isOK = (UI_Room.find(".isReady").length + UI_Room.find(".isNotSit").length == Int_CheckRoomIsReadyStart);
		if (isOK) {
			UI_ReadyBtn.attr("disabled", false);
		} else {
			UI_ReadyBtn.attr("disabled", true);
		}
	}
}

// 一般玩家 wait 
function waitGameStart () {
	$.get("ajax_waitGameStart.php", { Int_RoomID: Int_RoomID}, function (data){
		if (data.success == 1) {
			clearTimeout(Event_RefreshRoomStatus);
			clearTimeout(Event_RefreshWaitGameStart);
			enterShowGameOrder();
			return;
		}
		Event_RefreshWaitGameStart = setTimeout(waitGameStart, Int_RefreshTime);
	}, 'JSON');
}

/* Stage 4 */
function enterShowGameOrder () {
	clearStage();
	setTimeout(function () {
		getShowGameOrder();
		startStage();
	}, Int_AnimationTime);
}

function getShowGameOrder () {
	$.get("ajax_getShowGameOrder.php", { Int_RoomID : Int_RoomID },function (data) {
		Int_PlayerCount = data.playerCount;
		Int_ShowGameOrderIndex = 0;
		var ShowGameOrderHTML = "<div id=\"Div_ShowGameOrder\">";
		for (var i in data.order) {
			if (data.order[i] == ArrayText_SeatCode[Int_RoomOrder]) {
				ShowGameOrderHTML += "<div class=\"isYou\">" + data.order[i] + "</div>";
			} else {
				ShowGameOrderHTML += "<div>" + data.order[i] + "</div>";
			}
		}
		ShowGameOrderHTML += "</div>";
		UI_Stage.html(ShowGameOrderHTML);
		orderInAnimation();
	}, 'JSON');
}

function orderInAnimation () {
	if (Int_PlayerCount == Int_ShowGameOrderIndex) {
		Int_ShowGameOrderIndex = 0;
		setTimeout(orderOutAnimation, 1500);
		return ;
	}
	$("#Div_ShowGameOrder div").eq(Int_PlayerCount - 1 - Int_ShowGameOrderIndex)
								.css("opacity", 1)
								.addClass("orderInAnimation");
	Int_ShowGameOrderIndex ++;
	setTimeout(orderInAnimation, Int_ShowGameOrderTime);
}

function orderOutAnimation () {
	if (Int_PlayerCount == Int_ShowGameOrderIndex) {
		getShowCard();
		return ;
	}
	$("#Div_ShowGameOrder div").eq(Int_ShowGameOrderIndex)
								.css("opacity", 0)
								.addClass("orderOutAnimation");
	Int_ShowGameOrderIndex ++;
	setTimeout(orderOutAnimation, Int_ShowGameOrderTime);
}

/* Stage 5,6 */
function showLightBox(e) {
	Int_ChooseCardID = $(e.target).data("card-id");
	UI_LightBox.fadeIn(Int_LightBoxProcessTime);
	UI_LightBox.find("#Div_ShowChooseCard img").attr("src", "media/card/" + Int_ChooseCardID + ".png");
}

function decideChooseCard() {
	lookChooseCard();
	$.get("ajax_decideCard.php",
		{
			Int_RoomID : Int_RoomID,
			Int_ChooseCardID : Int_ChooseCardID,
		}, 
		function (data) {
			if(data.success == 1) {
				waitUserChooseCard();
			}
		},
		'JSON'
	);
}

function waitUserChooseCard() {
	$.get("ajax_getUserChooseCardStatus.php", { Int_RoomID : Int_RoomID }, function (data) {
		if (data.success == 1) {
			showCardOutAnimation();
		} else {
			setTimeout(waitUserChooseCard, Int_RefreshTime);
		}
	}, 'JSON');
}

function waitTellerChooseCard() {
	$.get("ajax_getTellerChooseCardStatus.php", { Int_RoomID : Int_RoomID }, function (data) {
		console.log(data);
		if (data.success == 1) {
			startChooseCard();
		} else {
			setTimeout(waitTellerChooseCard, Int_RefreshTime);
		}
	}, 'JSON');
}

function lookChooseCard () {
	UI_LightBox.fadeOut(Int_LightBoxProcessTime);
	UI_ShowCardDIV.find(".showCard").removeClass("isCanChoose");
	UI_ShowCardDIV.find("img").addClass("isLock");
	UI_ShowCardDIV.off("click", ".showCard", showLightBox);
}

function startChooseCard () {
	UI_ShowCardDIV.find(".showCard").addClass("isCanChoose");
	UI_ShowCardDIV.find("img").removeClass("isLock");
	UI_ShowCardDIV.on("click", ".showCard", showLightBox);
}

function getShowCard () {
	$.get(
		"ajax_getShowCard.php", 
		{
			Int_RoomID : Int_RoomID,
			Int_RoomOrder : Int_RoomOrder
		},
		function (data) {
			var ShowCard = "<div id=\"Div_ShowCard\">";
			for (var i in data) {
				var Int_CardID = data[i];
				ShowCard += "<div class=\"showCard\">" +
							"<img data-card-id=\"" + Int_CardID +"\" src=\"media/card/" + Int_CardID + ".png\" />" +
							"</div>";
			}
			ShowCard += "</div>";
			UI_Stage.html(ShowCard);
			UI_ShowCardDIV = $("#Div_ShowCard");
			showCardInAnimation();
		},
		'JSON'
	);
}

function showCardInAnimation () {
	if (Int_ShowCardCount == Int_ShowCardIndex) {
		Int_ShowCardIndex = 0;
		if (Bool_IsTeller == true) {
			startChooseCard();
		} else {
			lookChooseCard();
			waitTellerChooseCard();
		}
		return ;
	}
	$("#Div_ShowCard .showCard").eq(Int_ShowCardCount - 1 - Int_ShowCardIndex)
								.css("opacity", 1)
								.addClass("showCardInAnimation");
	Int_ShowCardIndex ++;
	setTimeout(showCardInAnimation, Int_ShowCardTime);
}

function showCardOutAnimation () {
	if (Int_ShowCardCount == Int_ShowCardIndex) {
		getVoteCard();
		return ;
	}
	$("#Div_ShowCard div").eq(Int_ShowCardCount - 1 - Int_ShowCardIndex)
								.css("opacity", 0)
								.addClass("showCardOutAnimation");
	Int_ShowCardIndex ++;
	setTimeout(showCardOutAnimation, Int_ShowCardTime);
}

function getVoteCard() {
	$.get("ajax_getVoteCard.php", { Int_RoomID : Int_RoomID }, function (data) {
		console.log(data);
		var VoteCardHTML = "<div id=\"Div_ShowVoteCard\"><div class=\"voteCardRow\">";
		for (var i in data.card) {
			VoteCardHTML += "<span class=\"voteCard\">" + 
							"<button data-vote-id=\""+ data.card[i] + "\" >OK</button>" + 
							"<img src=\"media/card/" + data.card[i] + ".png\" />" +
							"</span>";
			if (i != 0 && i % 3 == 0) {
				VoteCardHTML += "</div><div class=\"voteCardRow\">";
			}
		}
		VoteCardHTML += "</div></div>";
		UI_Stage.html(VoteCardHTML);
	 	UI_ShowVoteCardDIV = $("#Div_ShowVoteCard");
	 	UI_ShowVoteCardDIV.fadeIn(Int_AnimationTime);
	 	if (Bool_IsTeller) {
	 		lockVoteCard();
	 		waitUserVoteCard();
	 	} else {
	 		startVote();
	 	}
	}, 'JSON');
}

function lockVoteCard() {
	UI_ShowVoteCardDIV.find(".voteCard img").addClass("isLock");
}

function waitUserVoteCard () {
	$.get("ajax_getUserVoteCardStatus.php", {Int_RoomID : Int_RoomID}, function (data) {
		if (data.success == 1) {
			showAnswer();
		} else {
			setTimeout(waitUserVoteCard, Int_RefreshTime);
		}
	}, 'JSON');
}

function startVote() {
	UI_ShowVoteCardDIV.find(".voteCard img").addClass("isCanChoose");
	UI_Stage.on("click", "img", chooseVoteCard);
}

function chooseVoteCard(e) {
	var choosedCard = $(e.target);
	choosedCard.addClass("isChoose")
				.siblings("button").addClass("isShowButton").show(Int_RefreshTime);
	UI_Stage.off("click", "img", chooseVoteCard);
	lockOtherVoteCard();
	$("body").on("click", cancelOtherLockVoteCard);
}

function lockOtherVoteCard () {
	UI_LightBox.fadeIn(Int_AnimationTime);
	UI_LightBox.find("#Div_LightBoxContent").css("display", "none");
	UI_ShowVoteCardDIV.find(".voteCard img").removeClass("isCanChoose").not(".isChoose").addClass("isLock");
}

function cancelOtherLockVoteCard (e) {
	console.log($(e.target));
	if ($(e.target).attr("class") == "isChoose" || $(e.target).attr("class") == "isShowButton") {
		return;
	}
	$("body").off("click", cancelOtherLockVoteCard);
	startVote();
	UI_LightBox.fadeOut(Int_AnimationTime);
	UI_ShowVoteCardDIV.find(".voteCard img").removeClass("isLock").removeClass("isChoose");
	$(".isShowButton").css("display", "none").removeClass(".isShowButton");
}

function voteCard(e) {
	$("body").off("click", cancelOtherLockVoteCard);
	UI_LightBox.fadeOut(Int_AnimationTime);	
	UI_ShowVoteCardDIV.find(".voteCard img").removeClass("isLock").removeClass("isChoose");
	$(".isShowButton").css("display", "none").removeClass(".isShowButton");
	Int_VoteID = $(e.target).data("vote-id");
	$.get("ajax_setVoteCard.php" , {Int_VoteID : Int_VoteID}, function (data) {
		if (data.success) {
			lockVoteCard();
			waitUserVoteCard();
		}
	}, 'JSON');
}

/* Stage 7 */

function showAnswer () {
	clearStage();
	UI_LightBox.find("#Div_LightBoxContent").css("display", "none");
	UI_LightBox.fadeIn(Int_AnimationTime);
	$("#Div_Answer").fadeIn(Int_AnimationTime);

	getAnswer();
}

function getAnswer() {
	$.get("ajax_getAnswer.php", { Int_RoomID : Int_RoomID }, function (data) {
		var AnswerItemsHTML = "";
		for (var i in data) {
			AnswerItemsHTML +=  "<div class=\"Div_AnswerItem\">" +
								"<img src=\"media/card/" + data[i].card + ".png\" />" +
								"<div class=\"Div_VotePeople\">";
			if (i == 0) {
				AnswerItemsHTML += "<span>Answer!!!</span>";
			}
			if (typeof data[i].people != 'undefined') {
				console.log(data[i].people);
				for (var j in data[i].people) {
					AnswerItemsHTML += "<span>" + ArrayText_SeatCode[data[i].people[j]] + "</span>";
				}
			}
			AnswerItemsHTML +=  "</div></div>";
			$("#Div_AnswerList").html(AnswerItemsHTML);
		}
	}, 'JSON');
}