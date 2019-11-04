if((function() {
	var selfForJquery = arguments.callee;

	if(typeof jQuery == 'undefined') {

		var script = document.createElement("SCRIPT");
		script.src = 'https:\/\/code.jquery.com/jquery-latest.js';
		script.type = 'text/javascript';
		document.getElementsByTagName("head")[0].appendChild(script);

		// Poll for jQuery to come into existance
		var checkReady = function(callback) {
			if (window.jQuery) {
				callback(jQuery);
			} else {
				window.setTimeout(function() { checkReady(callback); }, 20);
			}
		};

		// Start polling...
		checkReady(function($) {
			$(function() {
				selfForJquery.call();
			});
		});

		throw "jQuery não encontrado, baixando...";
	}

	var cards_name = JSON_CARDS_NAME;
	var $ = jQuery; // alguns sites o $ nao está definido
	if(window.location.host == 'www.heartharena.com' && typeof(cards) != 'undefined') {
		// tradução feita no site heartharena.com
		var i;
		for(i in cards) {
			cards[i].name = cards_name[cards[i].name] || cards[i].name;
		};

		// Está na propria pagina do heartharena, linha 461
		app = new ArenaApp($('body')[0], cards, 1, null, false);
		app.start();

		alert('traduzido');
		return true;
	};
	var atualizar = false; // selecione isso como true para atualizar
	if(atualizar) {
		if(typeof(en) == 'undefined' || typeof(pt) == 'undefined') {
			console.log('As variaveis en e pt não estão definidas');
			return false;
		};
		var searchID = function (id) {
			var tipo, carta;
			for(tipo in pt) {
				for(carta in pt[tipo]) {
					if(pt[tipo][carta].id == id) {
						if(pt[tipo][carta].name == '') {
							continue;
						};
						return pt[tipo][carta].name;
					};
				};
			};
			return false;
		};
		var tipo, carta, cards_name = {};
		for(tipo in en) {
			for(carta in en[tipo]) {
				var pt_name = searchID(en[tipo][carta].id);
				if(pt_name == false || en[tipo][carta].name == '') {
					continue;
				};
				cards_name[en[tipo][carta].name] = pt_name;
			};
		};
		var pre = $('<pre>').text(JSON.stringify(cards_name));
		$(document.body).html(pre);
		return true;
	};
	// tradução normal de outros sites
	var div = $('<div>').attr('id', 'leobastiani').css({
		left: '100px',
		top: '100px',
		position: 'fixed',
		background: '#FFF',
		zIndex: '9999999',
		padding: '20px',
		border: '10px solid #000'
	}).appendTo(document.body).html('Enter a card name here: <input id="tentativaInput" type="text">'
	+'<br> <span id="tentativaNome"></span> <br>'
	+'Click on the cards name: <input type="checkbox" checked id="hsTradutorAtivado">');

	var translateBtn = function (e) {
		// para todas as classes selecionadas
		classes.forEach(function (c) {
			var classe = $(document.getElementsByClassName(c));
			// para cada elemento da classe selecionada
			classe.each(function(index, elem) {
				var htmlContent = $.trim($(elem).html());
				var newName = typeof(cards_name[htmlContent]) != 'undefined' ? cards_name[htmlContent] : htmlContent;
				console.log('Traduzindo "'+htmlContent+'" para "'+newName+'"');
				$(elem).html(newName);
			});

			// remostra a classe
			classe.show();
		});

		// apaga o evento de bind
		$('*').unbind('click', clickFindCards);
		// apaga a div do programa
		div.remove();
	};
	var enviar = $('<input>').attr({
		id: 'enviarBtn',
		type: 'button',
		value: 'Translate'
	}).appendTo(div).click(translateBtn);
	var classes = new Array();
	var removeClass = function (e) {
		e.preventDefault();
		var c = $(this).data('class');
		$(document.getElementsByClassName(c)).show();
		$(this).remove();
		return false;
	};
	var clickFindCards = function(e) {
		if(!$('#hsTradutorAtivado').is(':checked') || $(e.target).is('#hsTradutorAtivado')) {
			return true;
		}
		var elem = $(e.currentTarget);
		var c = elem.attr('class');
		if(c == undefined) {
			return false; // nao hide nada, pq nao tem classe
		};
		classes.push(elem.attr('class'));
		$(document.getElementsByClassName(c)).hide();
		console.log('Classes para apagar:', classes);

		// adicionando a classe na janela de dialogo
		var removeSpan = $('<span>').html('<br>'+c+' - REMOVER').appendTo(div).data('class', c).click(removeClass);
		e.preventDefault();
		return false;
	};
	var changeTentativaInput = function (e) {
		// procura nas cartas, tanto em portugues, quanto em ingles
		var key = new RegExp($(this).val(), 'ig');
		var cardEn;
		var cardsPossiveis = new Array();
		for(cardEn in cards_name) {
			var cardPt = cards_name[cardEn];
			if(cardEn.match(key) || cardPt.match(key)) {
				cardsPossiveis.push(cardEn+' = '+cardPt);
			}
		}
		$('#tentativaNome').html('<br>'+cardsPossiveis.join('<br>')+'<br>');
	}
	$('*').not('#hsTradutorAtivado').bind('click', clickFindCards);
	$('#tentativaInput').change(changeTentativaInput);
	return true;
}())){}
