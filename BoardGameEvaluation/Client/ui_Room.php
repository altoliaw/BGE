<div id="Div_Room">
<table>
	<tr>
		<?php for ($i = 0 ; $i < 8 ; $i++) {?>
		<td data-id="<?=$i?>"><?php echo $i + 1?></td>
		<?php if (($i+1) % 4 == 0 && $i != 7) {?></tr><tr><? } ?>
		<? } ?>
	</tr>
</table>
	<div id="Div_RoomBtn">
		<button id="Btn_ReadyStart" class="ui-btn ui-btn-inline">準備</button>
	</div>
</div>