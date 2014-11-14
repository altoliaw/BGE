<div id="Div_ChooseRoom">
	<table>
		<tr>
			<?php for ($i = 0 ; $i < 9 ; $i++) {?>
			<td data-id="<?=$i?>">第&nbsp;<?php echo $i + 1?>&nbsp;桌</td>
			<?php if (($i+1) % 3 == 0  && $i != 8) {?></tr><tr><? } ?>
			<? } ?>
		</tr>
	</table>
	<div id="Div_ChooseRoomBtn">
		<button id="Btn_ChooseRoomByTeller" data-identity="teller" class="ui-btn ui-btn-inline">說書人</button>
		<button id="Btn_ChooseRoomByUser" data-identity="user" class="ui-btn ui-btn-inline">一般玩家</button>
	</div>
</div>