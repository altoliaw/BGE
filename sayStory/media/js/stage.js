/* Debug */
var Bool_IsTellerProcess;

var Bool_IsTeller;
var UI_Stage;
var UI_ChooseRoom;
var UI_Room;
var UI_ReadyBtn;
var UI_LightBox;
var UI_ShowVoteCardDIV;
var UI_ShowCardDIV;
var Text_GUID;
var Event_RefreshChooseRoomStatus;
var Event_RefreshRoomStatus;
var Event_RefreshWaitGameStart;
var Int_AnimationTime = 300;
var Int_RefreshTime = 500;
var Int_RoomID;
var Int_RoomOrder;
var Int_CheckRoomIsReadyStart = 7;
var Int_PlayerCount;
var Int_ShowGameOrderIndex;
var Int_ShowGameOrderTime = 500;
var Int_ShowCardCount = 5;
var Int_ShowCardIndex = 0;
var Int_ShowCardTime = 500;
var Int_LightBoxProcessTime = 500;
var Int_ChooseCardID;

var ArrayText_SeatCode = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H');

$(function () {
	setGUID();
	UI_Stage = $("#Div_Stage");
	UI_LightBox = $("#Div_LightBox");
	UI_Stage.on("click", "#Btn_Start", enterChooseRoom);
	UI_Stage.on("click", "#Div_ChooseRoom td", chooseRoom);
	UI_Stage.on("click", "#Btn_ChooseRoomByTeller", checkCanEnterRoom);
	UI_Stage.on("click", "#Btn_ChooseRoomByUser", checkCanEnterRoom);
	UI_Stage.on("click", "#Btn_ReadyStart", readyStart);
	UI_Stage.on("click", ".voteCard button", voteCard);
	UI_LightBox.on("click", "#Btn_DecideChooseCard", decideChooseCard);
	UI_LightBox.on("click", "#Btn_CancelChooseCard", cancelChooseCard);
});

function setGUID () {
	if (localStorage.GUID == null) {
		$.get("ajax_getGUID.php", function (data) {
			Text_GUID = data.GUID;
    		localStorage.setItem("GUID", Text_GUID);
		}, 'JSON');
	} else {
		Text_GUID = localStorage.GUID;
	}
}

// 進入Stage與離開Stage用。
function clearStage () {
	UI_Stage.fadeOut(Int_AnimationTime);
}

function startStage () {
	UI_Stage.fadeIn(Int_AnimationTime);
}

/* Stage 1 */
function enterChooseRoom (event) {
	clearStage();
	setTimeout(function () {
		getChooseRoomDiv();
	}, Int_AnimationTime);
}

/* Stage 2 */
function getChooseRoomDiv () {
	// 進入第二個Stage時
	$.get("ui_chooseRoom.php" ,function (data) {
		UI_Stage.html(data);
		UI_ChooseRoom = $("#Div_ChooseRoom");
		getChooseRoomStatus();
		startStage();
	});
}

function getChooseRoomStatus () {
	$.get("ajax_getChooseRoomStatus.php" ,function (data) {
		UI_ChooseRoom.find("table td").removeClass("roomIsFull");
		for (var i in data) {
			UI_ChooseRoom.find("table td").eq(data[i])
			.removeClass("roomIsChoose")
			.addClass("roomIsFull");
		}
	}, 'json');
	Event_RefreshChooseRoomStatus = setTimeout(getChooseRoomStatus, Int_RefreshTime);
}

function chooseRoom () {
	Bool_IsNotFull = $(this).attr("class") != "roomIsFull";
	if (Bool_IsNotFull) {
		$(this).parents().find("td").removeClass("roomIsChoose");
		$(this).addClass("roomIsChoose");
	}
}

function checkCanEnterRoom (e) {
	var UI_ChooseRoom = UI_Stage.find(".roomIsChoose");
	var Bool_IsChoose = UI_ChooseRoom.length == 1;
	if (Bool_IsChoose) {
		// Debug
		Bool_IsTellerProcess = $(e.target).data("identity") == "teller";
		checkRoomStatus(UI_ChooseRoom.data("id"))
	} else {
		alert("請先選擇");
	}
}

function checkRoomStatus (Int_RoomID) {
	$.get("ajax_checkRoomStatus.php", { Int_RoomID: Int_RoomID },function (data){
		if (data.success == 1) {
			clearTimeout(Event_RefreshChooseRoomStatus);
			Int_RoomID = Int_RoomID;
			getUserOrder();
		} else {
			alert("第" + (Int_RoomID + 1) + "桌已滿！");
		}
	}, 'JSON');
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
			enterRoom();
		},
		'JSON'
	);
}

/* Stage 3 */
function enterRoom () {
	clearStage();
	setTimeout(function () {
		getRoomDiv();
	}, Int_AnimationTime);
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

function readyStart() {
	$.get(
		"ajax_setReady.php",
		{ 
			Int_RoomID: Int_RoomID,
			Int_RoomOrder: Int_RoomOrder
		},
		function (data) {
			UI_ReadyBtn.attr("disabled", true);
			if (Bool_IsTeller) {
				setGameStart();
			} else {
				waitGameStart();
			}
		},
		'JSON'
	);
}

function setGameStart () {
	$.get("ajax_setGameStart.php", { Int_RoomID: Int_RoomID}, function (data){
		if (data.success == 1) {
			clearTimeout(Event_RefreshRoomStatus);
			enterShowGameOrder();
		}
	}, 'JSON');

}

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

function cancelChooseCard() {
	UI_LightBox.fadeOut(Int_LightBoxProcessTime);
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
		enterVote();
		return ;
	}
	$("#Div_ShowCard div").eq(Int_ShowCardCount - 1 - Int_ShowCardIndex)
								.css("opacity", 0)
								.addClass("showCardOutAnimation");
	Int_ShowCardIndex ++;
	setTimeout(showCardOutAnimation, Int_ShowCardTime);
}



/* Stage 7 */
function enterVote() {
	getVoteCard();
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