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
		result: {
			get: function(opt){
				return $.ajax({
					url: options.domain + '/ConnectMiddleLayer.php?type=read&target=gameresult&roomid=' + opt.Int_RoomID + '&guid=' +  Text_GUID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_resultget',
					cache: false
				}) ;

			}
		}
	},
	room: {
		status:{
			get: function(opt){
				opt = opt ? opt : {};
				opt.callback = opt.callback ? opt.callback : 'jsonp_Readystatus';

				return $.ajax({
					url: options.domain + '/ConnectMiddleLayer.php?type=read&target=playerready&roomid='+ opt.Int_RoomID + '&guid=' + Text_GUID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: opt.callback,
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
					url: options.domain + '/ConnectMiddleLayer.php?type=write&target=choosecard&roomid=' + opt.Int_RoomID + '&cardid=' + opt.Int_ChooseCardID + '&guid=' + Text_GUID,
					dataType: 'jsonp',
					type: 'GET',
					jsonp: 'callback',
					jsonpCallback: 'jsonp_cardecide',
					cache: false
				}) ;
		},
		player: {
			chooseStatus:{
				get: function(opt){
				
					opt = (opt) ? opt : {} ;
					opt.callback = opt.callback ? opt.callback : 'jsonp_choosestatusplayer'
				
					return $.ajax({
						url: options.domain + '/ConnectMiddleLayer.php?type=read&target=choosecard&roomid=' + opt.Int_RoomID + '&guid=' + Text_GUID ,
						dataType: 'jsonp',
						type: 'GET',
						jsonp: 'callback',
						jsonpCallback: opt.callback,
						cache: false
					}) ;
				}
			}
		},
		show: {
			self: {
				get: function(opt){
					return $.ajax({
					    url: options.domain + '/ConnectMiddleLayer.php?type=read&target=cardstack&roomid='+ opt.Int_RoomID  +'&guid=' + Text_GUID,
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
							url: options.domain + '/ConnectMiddleLayer.php?type=read&target=cardstacktable&roomid=' + opt.Int_RoomID + '&guid=' + Text_GUID,
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
							url: options.domain + '/ConnectMiddleLayer.php?type=write&target=votestatus&roomid=' + opt.Int_RoomID +'&cardid=' + opt.Int_VoteID + '&guid=' + Text_GUID,
							dataType: 'jsonp',
							type: 'GET',
							jsonp: 'callback',
							jsonpCallback: 'jsonp_voteset',
							cache: false
						}) ;
			},
			get: function(opt){
				return $.ajax({
						url: options.domain + '/ConnectMiddleLayer.php?type=read&target=votestatus&roomid=' + opt.Int_RoomID + '&guid=' + Text_GUID,
						dataType: 'jsonp',
						type: 'GET',
						jsonp: 'callback',
						jsonpCallback: 'jsonp_voteget',
						cache: false
					}) ;
			}
		}
	}
} ;

$(function () {

	UI_Stage = $("#Div_Stage") ;

//---- Stage.0 大廳前 ----
	UI_Stage
		// Stage.0 進入大廳
		.on("click", "#Btn_Start", function(){
			clearStage()
				.done(function(){
					// 大廳版型
					var _makeHall = function(){
						var tables = ''
						for (var i = 1 ; i <= 9 ; i++)
			　			{
			　				tables += '<td data-id="' + i + '">第&nbsp;' + i + '&nbsp;桌</td>' ;
							tables += (i % 3 == 0  && i != 9) ? '</tr><tr>' : '';
			　			}

						var tpl = '<div id="Div_ChooseRoom">' +
					　　　　　　	'<table>' +
					　　　　　　		'<tr>' +
										tables +
					　　　　　　		'</tr>' +
					　　　　　　	'</table>' +
					　　　　　　	'<div id="Div_ChooseRoomBtn">' +
					　　　　　　		'<button id="Btn_ChooseRoomByTeller" data-identity="teller" class="ui-btn ui-btn-inline">說書人</button>' +
					　　　　　　		'<button id="Btn_ChooseRoomByUser" data-identity="player" class="ui-btn ui-btn-inline">一般玩家</button>' +
					　　　　　　	'</div>' +
					　　　　　　'</div>' ;

						UI_Stage.html(tpl);
					}();

					
					Event_RefreshChooseRoomStatus = true ;
					
					// 持續檢查 房間狀態, 大廳UI
					var getChooseRoomStatus = function () {
						API.ChooseRoomStatus.get()
							.done(function (data) {
								$.each(data, function(idx, dat){
									if (dat.isAvailable == false || dat.isReady == true){
										$("#Div_ChooseRoom")
											.find("table td")
											.eq((dat.Roomid - 1))
											.removeClass("roomIsChoose")
											.addClass("roomIsFull");
									}
								}) ;

								if (Event_RefreshChooseRoomStatus == true){
									setTimeout(getChooseRoomStatus, Int_RefreshTime) ;
								}
							});
					};

					getChooseRoomStatus();
					startStage();
				});
		})
		// Stage.0 Set Guid
		.on('_SET_GUID', function () {
			if (localStorage.GUID == null) {
				API.GUID.get()
					.done(function (data) {
						Text_GUID = data.Guid;
						localStorage.setItem("GUID", Text_GUID);
					});
			} else {
				Text_GUID = localStorage.GUID;
			}
		})
		.trigger('_SET_GUID') ;

//---- Stage.1 大廳內 ----	
	UI_Stage
		// Stage.1 選擇房間
		.on("click", "#Div_ChooseRoom td", function(){
			if ($(this).attr("class") != "roomIsFull") {
				$(this)
					.parents()
					.find("td")
					.removeClass("roomIsChoose")
					.end()
					.end()
					.addClass("roomIsChoose");
			}
		})
		// Stage.1 選擇身份 (說書人,一般)
		.on("click", "#Btn_ChooseRoomByTeller, #Btn_ChooseRoomByUser", function(e){
			var _this = $(this);
			var UI_ChooseRoom = UI_Stage.find(".roomIsChoose");

			// 檢查是否有選房間
			if (UI_ChooseRoom.size() == 1) {
				API.ChooseRoomStatus.get({callback:'jsonp_checkStatus'})
					.done(function(data){

						Int_RoomID = UI_ChooseRoom.data("id") ;

						$.each(data, function(idx, dat){
							if (dat.Roomid == Int_RoomID && dat.isAvailable == true){
								if (dat.isAvailable == true){
									Event_RefreshChooseRoomStatus = false;

									// 進入房間
									UI_Stage.trigger('_ENTER_ROOM', {role: _this.data("identity"), Int_RoomID: Int_RoomID}) ;
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
		});

//---- Stage.2 房間內 ----	
	UI_Stage
		// Stage.2 進入房間
		.on('_ENTER_ROOM', function(e, opt){
			API.room.enter(opt)
				.done(function(dat){
					if (dat.success == true){
						API.room.status.get({Int_RoomID: Int_RoomID, callback: 'jsonp_userorder1'})
							.done(function (data){
								Bool_IsTeller = false ;
								clearStage()
									.done(function () {

										// 房間版型
										var _makeTable = (function(){
											var tables = ''
											$.each(data, function(idx, dat){
												tables += '<td data-id="' + idx + '" class="' + (dat.isself ? 'isYou' : '' ) + (dat.isempty ? ' isNotSit' : ' isSit' ) + '" >' + dat.order + '</td>' ;
												tables += ((idx+1) % 4 == 0  && idx != 7) ? '</tr><tr>' : '' ;

												if (idx == 0 && dat.isself){
													Bool_IsTeller = true
												}
										　	}) ;

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
											UI_ReadyBtn = $("#Div_Room #Btn_ReadyStart");
											if (Bool_IsTeller) {
												UI_ReadyBtn
													.text("開始")
													.attr("disabled", true);
											}
										})();

										Event_RefreshRoomStatus = true;
										
										// 持續檢查 房間狀態, 房間UI
										var getRoomStatus = function () {
											API.room.status.get({Int_RoomID: Int_RoomID, callback: 'jsonp_roomuicheck'})
												.done(function (data) {
													var bool_canStart = true ;

													$.each(data, function(idx, dat){
														$("#Div_Room table td").eq(idx)
															.removeClass('isNotSit isSit isReady')
															.addClass((dat.isempty == true) ? 'isNotSit' : 'isSit')
															.toggleClass('isReady', (dat.isready == true && dat.isempty == false)) ;

														bool_canStart = (idx > 0) ? (bool_canStart && dat.isready) : bool_canStart ;
													});
													
													// 說書人檢查遊戲開始
													if (Bool_IsTeller) {
														// 人員準備好 且 房內大於等於最低人數
														var isOK = bool_canStart && ($('td.isSit').length >= Int_LeastPlayerNum) ;
														
														UI_ReadyBtn.prop("disabled", !isOK) ;
													}
													
													bool_IsTellerInRoom =  (data[0].isempty == 0) ? true : false;

													if(Event_RefreshRoomStatus == true){
														setTimeout(getRoomStatus, Int_RefreshTime);
													}
												}) ;
										}

										getRoomStatus()
										startStage();
									});
							}) ;
					}
				}) ;
		})
		// Stage.2 準備 or 開始 (說書人,一般)
		.on("click", "#Btn_ReadyStart", function(e){
			if (bool_IsTellerInRoom == false){
				alert("說書人不在房內，請稍待");
				return;
			}

			if (Bool_IsTeller){
				API.game.start({Int_RoomID: Int_RoomID})
					.done(function (data){
						Event_RefreshRoomStatus = false;
						UI_Stage.trigger('_SHOW_GAME_ORDER');
					});
			}
			else{
				API.game.ready({ Int_RoomID: Int_RoomID})
					.done(function (data) {
						// 按鈕反灰, 檢查是否說書人按下開始
						UI_ReadyBtn.prop("disabled", true);

						Event_RefreshWaitGameStart = true;
						
						// 持續檢查 遊戲是否可開始
						var getGameStatus = function (){
							API.room.status.get({Int_RoomID: Int_RoomID})
								.done(function (data) {
									var bool_canStart = true ;
									$.each(data, function(idx, dat){
										bool_canStart = (idx == 0)
											? (bool_canStart && dat.isready && dat.isempty == false) // 說書人一定要在房內
											: (bool_canStart && dat.isready) ;
									});

									if (bool_canStart){
										Event_RefreshRoomStatus = false;
										Event_RefreshWaitGameStart = false;
										UI_Stage.trigger('_SHOW_GAME_ORDER');
									}
									else{
										if (Event_RefreshWaitGameStart == true){
											setTimeout(getGameStatus, Int_RefreshTime);
										}
									}
								});
						}

						getGameStatus() ;
					}) ;
			}
		})
		// Stage.2 離開房間
		.on('click', "#Btn_Exit", function(e){
			API.room.leave({ Int_RoomID: Int_RoomID})
				.done(function(dat){

					// 離開後要停止監控房間
					Event_RefreshRoomStatus = false;
					Event_RefreshWaitGameStart = false;
					alert('離開第' + Int_RoomID + '桌') ;

					// 暫時加入按鈕 (暫時解法)
					UI_Stage
						.append('<button id="Btn_Start" class="ui-btn ui-btn-inline">START</button>')
						.find('#Btn_Start')
						.trigger('click')
						.remove() ;
				}) ;
		});

//---- Stage.3 ----
	UI_Stage
		// Stage.3 過場動畫
		.on('_SHOW_GAME_ORDER', function(){
			clearStage()
				.done(function () {
					API.room.status.get({Int_RoomID: Int_RoomID, callback:'jsonp_userorder2'})
						.done(function (data) {
							Int_PlayerCount = 0;
							Int_ShowGameOrderIndex = 0;
							
							// 過場版型
							var _makeShowOrder = (function(){
								var tpl = "<div id=\"Div_ShowGameOrder\">";
								$.each(data, function(idx, dat){
									if (dat.isempty == true){
										return;
									}
									
									Int_PlayerCount++;

									if (dat.isself == true) {
										tpl += "<div class=\"isYou\">" + dat.order + "</div>";
									} else {
										tpl += "<div>" + dat.order + "</div>";
									}
								});

								tpl += "</div>";
								UI_Stage.html(tpl);
							})();

							// 排序 IN
							var orderAnimation = function () {
								if (Int_PlayerCount == Int_ShowGameOrderIndex) {
									Int_ShowGameOrderIndex = 0;
									clearTimeout(Event_Showorder);

									// 排序 out
									var _orderOutAnimation = function () {
										if (Int_PlayerCount == Int_ShowGameOrderIndex) {
											clearTimeout(Event_out) ;

											UI_Stage.trigger('_SHOW_CARD');
											return;
										}else{
											$("#Div_ShowGameOrder div")
												.eq(Int_ShowGameOrderIndex)
												.css("opacity", 0)
												.addClass("orderOutAnimation");

												Int_ShowGameOrderIndex ++;
												
											Event_out = setTimeout(_orderOutAnimation, Int_ShowGameOrderTime);
										}
									}

									_orderOutAnimation();
								}else{
									$("#Div_ShowGameOrder div")
										.eq(Int_PlayerCount - 1 - Int_ShowGameOrderIndex)
										.css("opacity", 1)
										.addClass("orderInAnimation");

									Int_ShowGameOrderIndex ++;

									Event_Showorder = setTimeout(orderAnimation, Int_ShowGameOrderTime);
								}
							};

							orderAnimation();
						}) ;

					startStage();
				}) ;
		});

//---- Stage.4 ----
	UI_Stage
		// Stage.4 發牌階段 新局開始
		.on('_SHOW_CARD', function(){
			API.card.show.self.get({Int_RoomID : Int_RoomID})
				.done(function (data) {
					// 由最後階段回來時需要做
					UI_LightBox
						.hide(Int_LightBoxProcessTime);
					$('#Div_Answer').hide();
						
					startStage();
					
					

					var card = data.cards ;

					// 卡片版型
					var _makeCard = (function () {
						var tpl = "<div id=\"Div_ShowCard\">";

						$.each(data.cards, function(idx, Int_CardID){
							tpl += "<div class=\"showCard\">" +
									"<img data-card-id=\"" + Int_CardID +"\" src=\"media/card/" + Int_CardID + ".png\" />" +
									"</div>";
						})

						tpl += "</div>";
						UI_Stage.html(tpl);
					})();
					
					// 發牌動畫
					var showCardInAnimation = function () {
						console.log(Int_ShowCardCount, Int_ShowCardIndex) ;

						if (Int_ShowCardCount == Int_ShowCardIndex) {
							clearTimeout(Event_CardIn);

							Int_ShowCardIndex = 0;
							if (Bool_IsTeller == true) {
								startChooseCard();
							} else {
								lookChooseCard();
								waitChooseCard();
							}
							return ;
						}
						else{
							// 修正 不然會看不到
							//$('#Div_ShowCard div').css('opacity',1) ;
						
							$("#Div_ShowCard .showCard")
								.eq(Int_ShowCardCount - 1 - Int_ShowCardIndex)
								.css("opacity", 1)
								.addClass("showCardInAnimation");

							Int_ShowCardIndex ++;
							
							Event_CardIn = setTimeout(showCardInAnimation, Int_ShowCardTime);
						}
					};

					showCardInAnimation() ;
				}) ;
		});

	UI_Stage
		// 猜說書人牌階段的按鈕
		.on("click", ".voteCard button", function(e){

			Int_VoteID = $(e.target).data("vote-id");
			
			if (Int_VoteID == Int_ChooseCardID){
				alert('不可選自己的牌喔!');
				return;
			}

			$("body").off("click", cancelOtherLockVoteCard);
			UI_LightBox.fadeOut(Int_AnimationTime);
			UI_ShowVoteCardDIV.find(".voteCard img").removeClass("isLock").removeClass("isChoose");
			$(".isShowButton").css("display", "none").removeClass(".isShowButton");

			API.card.vote.set({Int_VoteID : Int_VoteID, Int_RoomID: Int_RoomID})
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
						waitAllUserChooseCard();
					}
				}) ;
		})
		// 取消卡片-題目
		.on("click", "#Btn_CancelChooseCard", function(){
			UI_LightBox.fadeOut(Int_LightBoxProcessTime);
		})
		// 再玩一局
		.on('click', 'button#PlayAgain', function(){
			UI_Stage.trigger('_SHOW_CARD') ;
		});

	$(document)
		// Stage.4 出牌階段結束, 卡片移除
		.on('_OUT_CARD', function(){
				var showCardOutAnimation = function() {
					if (Int_ShowCardCount == Int_ShowCardIndex) {
					
						Int_ShowCardIndex = 0;
						$(document).trigger('_SHOW_VOTE_CARD');
						return ;
					}
					$("#Div_ShowCard div")
						.eq(Int_ShowCardCount - 1 - Int_ShowCardIndex)
						.css("opacity", 0)
						.addClass("showCardOutAnimation");

					Int_ShowCardIndex ++;
					setTimeout(showCardOutAnimation, Int_ShowCardTime);
				}

				showCardOutAnimation();
		})
		// Stage.5 投票階段
		.on('_SHOW_VOTE_CARD', function(){
			API.card.show.all.get({ Int_RoomID : Int_RoomID })
				.done(function (data) {
					// 投票版型
					var _makeVote = (function(){
						var tpl = "<div id=\"Div_ShowVoteCard\"><div class=\"voteCardRow\">";
						
						$.each(data.cards, function(i, card){
							tpl += "<span class=\"voteCard\">" +
											"<button data-vote-id=\""+ card + "\" >OK</button>" +
											"<img src=\"media/card/" + card + ".png\" />" +
											"</span>";
							tpl += (i != 0 && i % 3 == 0) ? "</div><div class=\"voteCardRow\">" : '' ;
						});

						tpl += "</div></div>";
						UI_Stage.html(tpl);
						UI_ShowVoteCardDIV = $("#Div_ShowVoteCard");
						UI_ShowVoteCardDIV.fadeIn(Int_AnimationTime);
					})();

					if (Bool_IsTeller) {
						lockVoteCard();
						waitUserVoteCard();
					} else {
						startVote();
					}
				}) ;
		})
		// Stage.6 秀答案 最後階段, 要可以觸發回 發牌階段 新局開始
		.on('_SHOW_ANSWER', function(){
			clearStage()
				.done(function(){
					UI_LightBox.find("#Div_LightBoxContent").css("display", "none");
					UI_LightBox.fadeIn(Int_AnimationTime);
					$("#Div_Answer").fadeIn(Int_AnimationTime);

					// getAnswer
					API.game.result.get({ Int_RoomID : Int_RoomID })
						.done(function (data) {
							var AnswerItemsHTML = "";
							
							var result = data.result

							for (var i in result) {
								AnswerItemsHTML +=  "<div class=\"Div_AnswerItem\">" +
													"<img src=\"media/card/" + result[i].cardid + ".png\" />" +
													"<div class=\"Div_VotePeople\">";

								if (result[i].isanswer == true) {
									AnswerItemsHTML += "<span>Answer!!!</span>";
								}

								if (result[i].chooseuser.length > 0) {
									for (var j in result[i].chooseuser) {
										AnswerItemsHTML += "<span>" + result[i].chooseuser[j] + "</span>";
									}
								}
								AnswerItemsHTML +=  "</div></div>";
								$("#Div_AnswerList").html(AnswerItemsHTML);
							}
						});
				}) ;
		});

	// 離開Stage
	function clearStage () {
		return UI_Stage.fadeOut(Int_AnimationTime).promise();
	}

	// 進入Stage
	function startStage () {
		return UI_Stage.fadeIn(Int_AnimationTime).promise();
	}

	/* Stage 5,6 */
	function showLightBox(e) {
		Int_ChooseCardID = $(e.target).data("card-id");
		UI_LightBox.fadeIn(Int_LightBoxProcessTime);
		UI_LightBox.find("#Div_ShowChooseCard img").attr("src", "media/card/" + Int_ChooseCardID + ".png");

		$('#Div_LightBoxContent').show();
	}

	// 所有玩家選完牌後要過場動畫
	function waitAllUserChooseCard() {
		API.card.player.chooseStatus.get({ Int_RoomID : Int_RoomID, callback: 'jsonp_waitAllUserChooseCard'})
			.done(function (data) {
				
				var bool_isAllPlayerChoosed = true;

				$.each(data, function(idx, dat){
					bool_isAllPlayerChoosed = (bool_isAllPlayerChoosed && dat.isready);
				});

				if (bool_isAllPlayerChoosed == true) {
					$(document).trigger('_OUT_CARD') ;
				} else {
					setTimeout(waitAllUserChooseCard, Int_RefreshTime);
				}
		}) ;
	}

	// 等自己的前一家選完牌才可選牌
	function waitChooseCard() {
		API.card.player.chooseStatus.get({ Int_RoomID : Int_RoomID , callback: 'jsonp_waitChooseCard'})
			.done(function (data) {
				var bool_canChoose = true ;

				$.each(data, function(idx, dat){
					if (dat.isself == true){
						return false;
					}

					bool_canChoose = (bool_canChoose && dat.isready);
				});
				
				if (bool_canChoose == true){
					startChooseCard();
				} else {
					setTimeout(waitChooseCard, Int_RefreshTime);
				}
			}) ;
	}

	function lookChooseCard () {
		UI_LightBox.fadeOut(Int_LightBoxProcessTime);
		
		$("#Div_ShowCard")
			.find(".showCard")
			.removeClass("isCanChoose")
			.end()
			.find("img")
			.addClass("isLock")
			.end()
			.off("click", ".showCard", showLightBox);
	}

	function startChooseCard () {
		$("#Div_ShowCard")
			.find(".showCard")
			.addClass("isCanChoose")
			.end()
			.find("img")
			.removeClass("isLock")
			.end()
			.on("click", ".showCard", showLightBox);
	}

	function lockVoteCard() {
		UI_ShowVoteCardDIV.find(".voteCard img").addClass("isLock");
	}

	function waitUserVoteCard () {
		API.card.vote.get({Int_RoomID : Int_RoomID})
			.done(function (data) {
				var bool_canShowAnswer = true;
				$.each(data, function(idx, dat){
					bool_canShowAnswer = (bool_canShowAnswer && dat.isready);
				});
				
				if (bool_canShowAnswer == true) {
					$(document).trigger('_SHOW_ANSWER');
				} else {
					setTimeout(waitUserVoteCard, Int_RefreshTime);
				}
			})
	}

	// vote
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

		UI_ShowVoteCardDIV
			.find(".voteCard img")
			.removeClass("isLock isChoose") ;

		$(".isShowButton")
			.hide()
			.removeClass(".isShowButton");
	}
});