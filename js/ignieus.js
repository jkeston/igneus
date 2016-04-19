var sonic = [	{key:'L', desc:'Melody'},
				{key:'B', desc:'Beat'},
				{key:'P', desc:'Percussion'},
				{key:'C', desc:'Chord'},
				{key:'A', desc:'Apreggio'},
				{key:'S', desc:'Sequence'},				
				{key:'D', desc:'Drone'},
				{key:'p', desc:'Play Sample'},
				{key:'r', desc:'Record Sample'}	
			];
var control = [ {key:'s', desc:'Sine'},
				{key:'H', desc:'Square'},
				{key:'R', desc:'Sample & Hold'},
				{key:'M', desc:'Sawtooth'},
				{key:'V', desc:'Triangle'},
				{key:'Z', desc:'Ramp'},
				{key:'h', desc:'Highpass'},
				{key:'b', desc:'Bandpass'},
				{key:'l', desc:'Lowpass'},
				{key:'d', desc:'Delay'},
				{key:'v', desc:'Reverb'}
			];
var chars = [	{key:'F', desc:'Roll'},
				{key:'G', desc:'Unmute'},
				{key:'m', desc:'Mute'},
				{key:'I', desc:'Up'},
				{key:'J', desc:'Down'},
				{key:'K', desc:'Down Up'},
				{key:'W', desc:'Up Down'},
				{key:'X', desc:'Back & Forth'},
				{key:'O', desc:'Loop'},
				{key:'E', desc:'Reverse'},
				{key:'c', desc:'Clocked'},
				{key:'u', desc:'Unclocked'},
				{key:'Y', desc:'Randomize'},
				{key:'Q', desc:'Quantize'},
				{key:'q', desc:'Unquantize'},
				{key:'x', desc:'Low-end'},
				{key:'y', desc:'Mid-range'},
				{key:'z', desc:'High-end'}
			];
var slotsPerLane = 9;
function generateDroppables() {
	for ( var l = 0; l < 5; ++l ) {
		$('.ignieus').append('<div class="lane'+l+'">');
		for ( var i = l * slotsPerLane; i < (l+1) * slotsPerLane; ++i ) {
			$('.lane'+l).append('<div id="slot'+i+'" class="slots">&nbsp;</div> ');
			$('#slot'+i).droppable({
				drop: function( event, ui ) {
					this.innerHTML = ui.helper.context.innerHTML;
					var c = ui.helper.context.className.split(' ');
					//console.log(ui.helper);
					// If glyph is dragged from a slot then move it
					if ( c[0] != 'glyph') {
						$('#'+ui.helper.context.id).html('&nbsp;');
					}
				}
			});
	    	$('#slot'+i).draggable({
				helper: "clone",
				appendTo: '.drag_style',
				zIndex: 1500,
				drag: function( event, ui ) {
					whileDragging();
				},
				stop: function() {
					placeEditSettings();
				}
			});
			//console.log('#slot'+i+' .lane'+l);
		}
		$('.ignieus').append('</div>');
	}
}
function whileDragging() {
	$( "#glyphs" ).panel( "close" );
	// make top icons into rubbish
	$('#tools').html('<a href="#trash">t</a>');
	$('#tools').droppable({
		drop: function( event, ui ) {
			var c = ui.helper.context.className.split(' ');
			console.log(ui.helper);
			// If glyph is dragged on trash then remove it
			if ( c[0] == 'slots') {
				$('#'+ui.helper.context.id).html('&nbsp;');
			}
		}
	});
}
function placeEditSettings() {
	$('#tools').html('<a href="#glyphs">e</a><a href="#settings">T</a>');
}

function renderGlyphs() {
	sonic.forEach( function(e) {
    	// l.push('<a class="glyph ' + e.key + '" href="#' + e.key + '" title="' + e.desc + '">' + e.key + '</a>');
    	$('#sonic').append('<a class="glyph ' + e.key + '" href="#' + e.key + '" title="' + e.desc + '">' + e.key + '</a> ');
    	$('.' + e.key).draggable({
			helper: "clone",
			appendTo: '.drag_style',
			zIndex: 1500,
			drag: function( event, ui ) {
				whileDragging();
			},
			stop: function() {
				placeEditSettings();
			}
		});
	});
	control.forEach( function(e) {
    	$('#control').append('<a class="glyph ' + e.key + '" href="#' + e.key + '" title="' + e.desc + '">' + e.key + '</a> ');
    	$('.' + e.key).draggable({
			helper: "clone",
			appendTo: '.drag_style',
			zIndex: 1500,
			drag: function( event, ui ) {
				whileDragging();
			},
			stop: function() {
				placeEditSettings();
			}
		});
	});
	chars.forEach( function(e) {
    	$('#chars').append('<a class="glyph ' + e.key + '" href="#' + e.key + '" title="' + e.desc + '">' + e.key + '</a> ');
    	$('.' + e.key).draggable({
			helper: "clone",
			appendTo: '.drag_style',
			zIndex: 1500,
			drag: function( event, ui ) {
				whileDragging();
			},
			stop: function() {
				placeEditSettings();
			}
		});
	});	
}
$(document).ready(function() {
	renderGlyphs();
	generateDroppables();
	placeEditSettings();
	// renderLaneSettings();
});

function renderLaneSettings() {
	for ( var i = 0; i < 5; ++i ) {
		var color_buttons = '';
		for ( var j = 0; j < 5; j++ ) {
			if (i == j) {
				var a = ' active';
			}
			color_buttons += '<a href="#" class="c'+j+a+'"> &nbsp; ';
			a = '';
		}
		$('#lane_settings').append(
'			<h4 class="l'+i+'">LANE '+(i+1)+'</h4>\n'+
'			<div class="lane_settings ls'+i+'">\n'+
'				<div class="leftcol">\n'+
'			        <label for="activate">ACTIVE</label>\n'+
'				</div>\n'+
'				<div class="rightcol">\n'+
'			        <select name="lane'+i+'_active" id="activate" data-role="flipswitch" data-mini="true">\n'+
'			            <option value="off">OFF</option>\n'+
'			            <option value="on">ON</option>\n'+
'			        </select>\n'+
'				</div>\n'+
'				<div class="left_30">\n'+
'			        <label for="lane'+i+'_chars_per_slot">CHARS PER SLOT</label>\n'+
'				</div>\n'+
'				<div class="right_70">\n'+
'					<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true" id="lane'+i+'_chars_per_slot">\n'+
'						<input type="radio" name="lane'+i+'_char_slots" id="lane'+i+'_char_slots_a" value="0" checked="checked">\n'+
'						<label for="lane'+i+'_char_slots_a">0</label>\n'+
'						<input type="radio" name="lane'+i+'_char_slots" id="lane'+i+'_char_slots_b" value="1">\n'+
'						<label for="lane'+i+'_char_slots_b">1</label>\n'+
'						<input type="radio" name="lane'+i+'_char_slots" id="lane'+i+'_char_slots_c" value="2">\n'+
'						<label for="lane'+i+'_char_slots_c">2</label>\n'+
'						<input type="radio" name="lane'+i+'_char_slots" id="lane'+i+'_char_slots_d" value="3">\n'+
'						<label for="lane'+i+'_char_slots_d">3</label>\n'+
'					</fieldset>\n'+
'				</div>\n'+
'				<div class="leftcol">\n'+
'			        <label for="notes">NOTES</label>\n'+
'				</div>\n'+
'				<div class="rightcol">\n'+
'			        <select name="lane'+i+'_notes" id="notes" data-role="flipswitch" data-mini="true">\n'+
'			            <option value="off">OFF</option>\n'+
'			            <option value="on">ON</option>\n'+
'			        </select>\n'+
'				</div>\n'+
'				<div class="left_30">\n'+
'			        <label for="lane'+i+'_color">COLOR</label>\n'+
'				</div>\n'+
'				<div class="right_70">'+color_buttons+'</div>\n'+
'			</div>\n');
	}
}