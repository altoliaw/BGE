//一般玩家檢查遊戲開始狀態	(使用檢查房間內人員準備狀態)

//取得房內人數及排序 (使用檢查房間內人員準備狀態)



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
		get: function(opt){
			opt = (opt) ? opt : {} ;
			opt.callback = opt.callback ? opt.callback : 'jsonp_getChooseRoomStatus'

			return $.ajax({
				url: options.domain +  '/ConnectMiddleLayer.php?type=read&target=hallroomstatus&guid=' +  Text_GUID,
				dataType: 'jsonp',
				type: 'GET',
				jsonp: 'callback',
				jsonpCallback: opt.callback,
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
	},
	game: {
		ready: function(opt){
			return $.ajax({
				url: options.domain + '/ConnectMiddleLayer.php?type=write&target=playerready&roomid='+ opt.Int_RoomID + '&guid=' + Text_GUID,
				dataType: 'jsonp',
				type: 'GET',
				jsonp: 'callback',
				jsonpCallback: 'jsonp_setReady',
				cache: false
			}) ;
		},
		start: function(opt){
			return $.ajax({
				url: options.domain + '/ConnectMiddleLayer.php?type=write&target=gamestart&roomid='+ opt.Int_RoomID + '&guid=' + Text_GUID,
				dataType: 'jsonp',
				type: 'GET',
				jsonp: 'callback',
				jsonpCallback: 'jsonp_setStart',
				cache: false
			}) ;
		},
		userorder: {
			get: function(opt){
				return $.ajax({
					url: 'ajax_getShowGameOrder.php?Int_RoomID=' + opt.Int_RoomID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_gameuserorder',
					cache: false
				}) ;
			}
		},
		result: {
			get: function(opt){
				return $.ajax({
					url: 'ajax_getAnswer.php?Int_RoomID=' + opt.Int_RoomID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_resultget',
					cache: false
				}) ;
			
			}
		}
	},
	user:{
		order: {
			get: function(opt){
				return $.ajax({
					url: options.domain +  '/ConnectMiddleLayer.php?type=read&target=playerorder&roomid=' + opt.Int_RoomID  + '&guid=' +  Text_GUID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_userorder',
					cache: false
				}) ;
			}
		}
	},
	room: {
		status:{
			get: function(opt){
				return $.ajax({
					url: options.domain + '/ConnectMiddleLayer.php?type=read&target=playerready&roomid='+ opt.Int_RoomID + '&guid=' + Text_GUID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_Readystatus',
					cache: false
				}) ;
			}
		},
		enter: function(opt){
			return $.ajax({
					url: options.domain + '/ConnectMiddleLayer.php?type=write&target=playerjoin&roomid=' + opt.Int_RoomID + '&guid=' + Text_GUID + '&act=join&role=' + opt.role,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_roomenter',
					cache: false
				}) ;

		},
		leave: function(opt){
			return $.ajax({
					url: options.domain + '/ConnectMiddleLayer.php?type=write&target=playerjoin&roomid=' + opt.Int_RoomID + '&guid=' + Text_GUID + '&act=leave',
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_roomleave',
					cache: false
				}) ;
		}
		
	},
	card: {
		decide: function(opt){
			return $.ajax({
					url: 'ajax_decideCard.php?Int_RoomID=' + opt.Int_RoomID + '&Int_ChooseCardID=' + opt.Int_ChooseCardID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_cardecide',
					cache: false
				}) ;
		},
		teller: {
			chooseStatus:{
				get: function(opt){
					return $.ajax({
						url: 'ajax_getTellerChooseCardStatus.php?Int_RoomID=' + opt.Int_RoomID,
						dataType: 'jsonp',
						type: 'GET',
						jsonp: 'callback',
						jsonpCallback: 'jsonp_choosestatusteller',
						cache: false
					}) ;
				}
			}
		},
		player: {
			chooseStatus:{
				get: function(opt){
					return $.ajax({
						url: 'ajax_getUserChooseCardStatus.php?Int_RoomID=' + opt.Int_RoomID,
						dataType: 'jsonp',
						type: 'GET',
						jsonp: 'callback',
						jsonpCallback: 'jsonp_choosestatusplayer',
						cache: false
					}) ;
				}
			}
		},
		show: {
			self: {
				get: function(opt){
					return $.ajax({
						url: 'ajax_getShowCard.php?Int_RoomID=' + opt.Int_RoomID + '&Int_RoomOrder=' + Int_RoomOrder,
						dataType: 'jsonp',
						type: 'GET',
						jsonp: 'callback',
						jsonpCallback: 'jsonp_vgetShowCard',
						cache: false
					}) ;
				}
			},
			all: {
				get: function(opt){
					return $.ajax({
							url: 'ajax_getVoteCard.php?Int_RoomID=' + opt.Int_RoomID,
							dataType: 'jsonp',
							type: 'GET',
							jsonp: 'callback',
							jsonpCallback: 'jsonp_votecardshow',
							cache: false
						}) ;
				}
			}
		},
		vote: {
			set: function(opt){
				return $.ajax({
							url: 'ajax_setVoteCard.php?Int_VoteID=' + opt.Int_VoteID,
							dataType: 'jsonp',
							type: 'GET',
							jsonp: 'callback',
							jsonpCallback: 'jsonp_voteset',
							cache: false
						}) ;
			},
			status: {
				get: function(opt){
					return $.ajax({
							url: 'ajax_getUserVoteCardStatus.php?Int_RoomID=' + opt.Int_RoomID,
							dataType: 'jsonp',
							type: 'GET',
							jsonp: 'callback',
							jsonpCallback: 'jsonp_choosestatusplayer',
							cache: false
						}) ;
				}
			}
		}
	}
} ;

$(function () {

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
		// Stage1. 選擇房間階段
		.on("click", "#Btn_Start", function(){
			clearStage()
				.done(function(){
					// 版型
					var tables = '' 
					for (var i = 1 ; i <= 9 ; i++) 
		　			{
		　				tables += '<td data-id="' + i + '">第&nbsp;' + i + '&nbsp;桌</td>' ;
		　				if (i % 3 == 0  && i != 9) tables += '</tr><tr>' ;
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
		// Stage1. 選擇房間
		.on("click", "#Div_ChooseRoom td", function(){
			if ($(this).attr("class") != "roomIsFull") {
				$(this).parents().find("td").removeClass("roomIsChoose");
				$(this).addClass("roomIsChoose");
			}
		})
		// Stage1. 選擇說書人或是一般
		.on("click", "#Btn_ChooseRoomByTeller, #Btn_ChooseRoomByUser", function(e){
			var _this = $(this);
			var UI_ChooseRoom = UI_Stage.find(".roomIsChoose");
			var Bool_IsChoose = UI_Stage.find(".roomIsChoose").length == 1;
			if (Bool_IsChoose) {
				API.ChooseRoomStatus.get({callback:'jsonp_checkStatus'})
					.done(function(data){

						Int_RoomID = UI_ChooseRoom.data("id") ;
						Bool_IsTellerProcess = _this.attr("id").indexOf('Teller') != -1;

						$.each(data, function(idx, dat){
							if (dat.Roomid == Int_RoomID && dat.isAvailable == true){
								if (dat.isAvailable == true){
									clearTimeout(Event_RefreshChooseRoomStatus);

									// 進入房間
									$(document).trigger('_ENTER_ROOM', {role: (Bool_IsTellerProcess ? 'teller' : 'player'), Int_RoomID: Int_RoomID}) ;
								}
								else{
									alert("第" + Int_RoomID + "桌已滿！");
								}
							}
						});
					});
			} else {
				alert("請先選擇");
			}
		})
		// 準備開始, 說書人一般共用
		.on("click", "#Btn_ReadyStart", function(e){
			if (Bool_IsTeller){
				API.game.start({Int_RoomID: Int_RoomID})
					.done(function (data){
						clearTimeout(Event_RefreshRoomStatus);
					
						return;

						enterShowGameOrder();
					}) ;
			}
			else{
				API.game.ready({ Int_RoomID: Int_RoomID})
					.done(function (data) {
						// 按鈕反灰, 檢查是否說書人按下開始
						UI_ReadyBtn.prop("disabled", true);
						getGameStatus();
					}) ;
			}
		})
		// 離開房間
		.on('click', "#Btn_Exit", function(e){
			API.room.leave({ Int_RoomID: Int_RoomID})
				.done(function(dat){

					// 離開後要停止監控房間
					clearTimeout(Event_RefreshRoomStatus);
					alert('離開第' + Int_RoomID + '桌') ;

					// 暫時加入按鈕 (暫時解法)
					UI_Stage.append('<button id="Btn_Start" class="ui-btn ui-btn-inline">START</button>') ;
					$('#Btn_Start').trigger('click').remove() ;
				}) ;
		})
		// 猜說書人牌階段的按鈕
		.on("click", ".voteCard button", function(e){
			$("body").off("click", cancelOtherLockVoteCard);
			UI_LightBox.fadeOut(Int_AnimationTime);	
			UI_ShowVoteCardDIV.find(".voteCard img").removeClass("isLock").removeClass("isChoose");
			$(".isShowButton").css("display", "none").removeClass(".isShowButton");
			Int_VoteID = $(e.target).data("vote-id");

			API.card.vote.set({Int_VoteID : Int_VoteID})
				.done(function (data) {
					if (data.success) {
						lockVoteCard();
						waitUserVoteCard();
					}
				}) ;
		
		}) ;

	UI_LightBox = $("#Div_LightBox");
	UI_LightBox
		// 確定送出-題目
		.on("click", "#Btn_DecideChooseCard", function(){
			lookChooseCard();
			API.card.decide({Int_RoomID : Int_RoomID,Int_ChooseCardID : Int_ChooseCardID})
				.done(function (data) {
					if(data.success == 1) {
						waitUserChooseCard();
					}
				}) ;
		})
		// 取消卡片-題目
		.on("click", "#Btn_CancelChooseCard", function(){
			UI_LightBox.fadeOut(Int_LightBoxProcessTime);
		});
		
	$(document)
		.on('_ENTER_ROOM', function(e, opt){
			// 進入房間 API
			API.room.enter(opt)
				.done(function(dat){

					if (dat.success == true){
						API.user.order.get({Int_RoomID: Int_RoomID})
							.done(function (data){
								Bool_IsTeller = false ;
								clearStage()
									.done(function () {
										var tables = '' 
										$.each(data, function(idx, dat){
											tables += '<td data-id="' + idx + '" class="' + (dat.isself ? 'isYou' : '' ) + (dat.isempty ? ' isNotSit' : ' isSit' ) + '" >' + dat.order + '</td>' ;

											if ((idx+1) % 4 == 0  && idx != 7){
												tables += '</tr><tr>' ;
											}
											
											if (idx == 0 && dat.isself)
											{
												Bool_IsTeller = true
											}
									　	}) ;

										// isReady, isYou, isSit , isNotSit

										var tpl = 	'<div id="Div_Room">' +
													'<table>' +
														'<tr>' +
														tables + 
														'</tr>' +
													'</table>' +
														'<div id="Div_RoomBtn">' +
															'<button id="Btn_ReadyStart" class="ui-btn ui-btn-inline">準備</button>' +
															'<button id="Btn_Exit" class="ui-btn ui-btn-inline">離開</button>' +
														'</div>' +
													'</div>' ;

										UI_Stage.html(tpl);
										UI_Room = $("#Div_Room");
										UI_ReadyBtn = UI_Room.find("#Btn_ReadyStart");
										if (Bool_IsTeller) {
											UI_ReadyBtn.text("開始").attr("disabled", true);
										}

										getRoomStatus();

										startStage();
									});
							}) ;
					}
				}) ;
		});

	// 離開Stage與用。
	function clearStage () {
		return UI_Stage.fadeOut(Int_AnimationTime).promise();
	}

	// 進入Stage
	function startStage () {
		return UI_Stage.fadeIn(Int_AnimationTime).promise();
	}

	// 持續檢查 房間狀態, 大廳UI
	function getChooseRoomStatus () {
		API.ChooseRoomStatus.get()
			.done(function (data) {
				$.each(data, function(idx, dat){
					if (dat.isAvailable == false){
						UI_ChooseRoom.find("table td").eq((dat.Roomid - 1))
						.removeClass("roomIsChoose")
						.addClass("roomIsFull");
					}
				})

				Event_RefreshChooseRoomStatus = setTimeout(getChooseRoomStatus, Int_RefreshTime);
			});
	}

	// 持續檢查 房間狀態, 房間UI
	function getRoomStatus () {
		API.room.status.get({Int_RoomID: Int_RoomID})
			.done(function (data) {
				var bool_canStart = true ;
			
				$.each(data, function(idx, dat){
					var UI_NowTd = UI_Room.find("table td").eq(idx);
					
					UI_NowTd.removeClass('isNotSit isSit isReady') ;

					if (dat.isempty == true){
						UI_NowTd.addClass('isNotSit') ;
					}else{
						UI_NowTd.addClass('isSit') ;
					}

					if (dat.isready == true && dat.isempty == false){
						UI_NowTd.addClass('isReady') ;
					}

					if (idx != 0){
						bool_canStart = (bool_canStart && dat.isready) ;
					}
				});

				Event_RefreshRoomStatus = setTimeout(getRoomStatus, Int_RefreshTime);

				// 說書人檢查遊戲開始
				if (Bool_IsTeller) {
					// 人員準備好 且 房內大於等於最低人數
					var isOK = bool_canStart && ($('td.isSit').length >= Int_LeastPlayerNum) ;
					UI_ReadyBtn.prop("disabled", !isOK) ;
				}
			}) ;
	}
	
	// 持續檢查 遊戲是否可開始
	function getGameStatus(){
		API.room.status.get({Int_RoomID: Int_RoomID})
			.done(function (data) {
				var bool_canStart = true ;
			
				$.each(data, function(idx, dat){
					bool_canStart = (bool_canStart && dat.isready) ;
				});

				if (bool_canStart){
					clearTimeout(Event_RefreshRoomStatus);
					clearTimeout(Event_RefreshWaitGameStart);
					enterShowGameOrder() ;
					return;
				}else{
					Event_RefreshWaitGameStart = setTimeout(getGameStatus, Int_RefreshTime);
				}
			});
	}
	
	

	/* Stage 4 */
	function enterShowGameOrder () {
		clearStage()
			.done(function () {
				getShowGameOrder();
				startStage();
			}) ;
	}

	function getShowGameOrder () {
		API.game.userorder.get({ Int_RoomID : Int_RoomID })
			.done(function (data) {
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
			}) ;
	}

	// 發牌階段 新局開始
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

	function waitUserChooseCard() {
		API.card.player.chooseStatus.get({ Int_RoomID : Int_RoomID })
			.done(function (data) {
				if (data.success == 1) {
					showCardOutAnimation();
				} else {
					setTimeout(waitUserChooseCard, Int_RefreshTime);
				}
			}) ;
	}

	function waitTellerChooseCard() {
		API.card.player.chooseStatus.get({ Int_RoomID : Int_RoomID })
			.done(function (data) {
				if (data.success == 1) {
					startChooseCard();
				} else {
					setTimeout(waitTellerChooseCard, Int_RefreshTime);
				}
			}) ;
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
		API.card.show.self.get({Int_RoomID : Int_RoomID,Int_RoomOrder : Int_RoomOrder})
			.done(function (data) {
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
			}) ;
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

		API.card.show.all.get({ Int_RoomID : Int_RoomID })
			.done(function (data) {
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
			}) ;
	}

	function lockVoteCard() {
		UI_ShowVoteCardDIV.find(".voteCard img").addClass("isLock");
	}

	function waitUserVoteCard () {
		API.card.vote.status.get({Int_RoomID : Int_RoomID})
			.done(function (data) {
			
				if (data.success == 1) {
					showAnswer();
				} else {
					setTimeout(waitUserVoteCard, Int_RefreshTime);
				}
			})
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
		if ($(e.target).attr("class") == "isChoose" || $(e.target).attr("class") == "isShowButton") {
			return;
		}
		$("body").off("click", cancelOtherLockVoteCard);
		startVote();
		UI_LightBox.fadeOut(Int_AnimationTime);
		UI_ShowVoteCardDIV.find(".voteCard img").removeClass("isLock").removeClass("isChoose");
		$(".isShowButton").css("display", "none").removeClass(".isShowButton");
	}

	// 最後階段, 要可以觸發回 發牌階段 新局開始
	function showAnswer () {
		clearStage()
			.done(function(){
				UI_LightBox.find("#Div_LightBoxContent").css("display", "none");
				UI_LightBox.fadeIn(Int_AnimationTime);
				$("#Div_Answer").fadeIn(Int_AnimationTime);

				// getAnswer
				API.game.result.get({ Int_RoomID : Int_RoomID })
					.done(function (data) {
						var AnswerItemsHTML = "";
						for (var i in data) {
							AnswerItemsHTML +=  "<div class=\"Div_AnswerItem\">" +
												"<img src=\"media/card/" + data[i].card + ".png\" />" +
												"<div class=\"Div_VotePeople\">";
							if (i == 0) {
								AnswerItemsHTML += "<span>Answer!!!</span>";
							}
							if (typeof data[i].people != 'undefined') {
								for (var j in data[i].people) {
									AnswerItemsHTML += "<span>" + ArrayText_SeatCode[data[i].people[j]] + "</span>";
								}
							}
							AnswerItemsHTML +=  "</div></div>";
							$("#Div_AnswerList").html(AnswerItemsHTML);
						}
					});	
			}) ;
	}
});