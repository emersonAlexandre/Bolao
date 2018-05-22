var BomBar = BomBar || {}

/**
 * @name função construtora para utilizar algumas funções js no formulário de cadastroBar.html
 *
 * @description
 * Nesta funcao sao aplicadas algumas regras para preenchimento do formulário de bar
 *
 * @author Emerson Davi
 **/
BomBar.CadastroOuEdicaoBar = (function() {

	/**
	 * Referências aos componentes da página
	 */
	function CadastroOuEdicaoBar() {
		this.btnGerarRanking = $('#gerar-ranking'); 
		this.urlApostadores = '/apostadores/listaapostadores';
		this.listaApostadores = [];
		this.teams = [];
	};

	/**
	 * Função que é inicializada assim que a página que está utilizando este arquivo js, é acessada, onde nela contém uma função que é acionada conforme hà mudanças no select de estados, e outra que é acionada no momento em que o botão remover é clicado
	 */
	CadastroOuEdicaoBar.prototype.iniciar = function() {
		this.btnGerarRanking.on('click', getApostadores.bind(this));
	}

	/**
	 * Função responsável por realizar uma requisição GET via AJAX para obter uma lista de cidades em formato JSON, passando por parâmetro na requisição um id referente ao estado que foi selecionado no select da página
	 */
	function getApostadores() {
		var tdPoint = document.evaluate('//*[@id="copia"]/tr[1]/th', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (tdPoint != null){
			$.ajax({
				dataType: 'json',
				url: this.urlApostadores,
				method: 'GET',
				success: sucessApostador.bind(this),
			});
		}
		
		else{
			$('#msg').html("Não foi possível gerar o ranking!");
			$('#componentmsg').removeClass('alert-success');
			$('#componentmsg').addClass('alert-danger');
			$('#componentmsg').removeClass('hidden');
		}
	};
	
	function salvarApostadores(apostadores){
		$.ajax({
			type : "POST",
			contentType : "application/json",
			accept: 'text/plain',
			url : "/apostadores/atualizar",
			data : JSON.stringify(apostadores),
			dataType: 'text',
			success: (function(){
				$('#msg').html("Ranking gerado com sucesso!");
				$('#componentmsg').removeClass('alert-danger');
				$('#componentmsg').addClass('alert-success');
				$('#componentmsg').removeClass('hidden');
				setTimeout(function(){
					location.reload();
				}, 1000)
				
			})
		});
	};

	/**
	 * Função que é responsável por popular o select de cidades na página cadastroBar.html conforme a lista de cidades em formato JSON que recebe por parâmetro
	 */
	function sucessApostador(data) {
		
		this.listaApostadores = data;
		
		var teams = [];
		
		pegarTimesDaSerieA(teams);
		
		calcularPontuacao(teams, this.listaApostadores);
		
		salvarApostadores(this.listaApostadores);
	};
	
	function pegarTimesDaSerieA(teams){
		var cont= 1;
		while(cont <= 39){
			var nomeTime = document.evaluate('//*[@id="copia"]/tr[' + cont + ']/td[1]/span[2]', document, null, XPathResult.STRING_TYPE, null);
			var pointTeam = document.evaluate('//*[@id="copia"]/tr[' + cont + ']/th', document, null, XPathResult.NUMBER_TYPE, null);
			var array = nomeTime.stringValue.trim().split(" - ");
			var nameTeam;

			if(nomeTime.stringValue.includes("Atlético") || nomeTime.stringValue.includes("América")){
				nameTeam = nomeTime.stringValue.trim();
			} else{
				nameTeam = array[0];
			}

			teams.push({name : nameTeam, point : pointTeam.numberValue});
			
			cont += 2;
		}
	};
	
	function calcularPontuacao(teams, apostadores){
		for (i = 0; i < apostadores.length; i++){
			var array = apostadores[i].times.split(", ");
			var points = 0;
			for(j = 0; j < array.length; j++){
				for(k = 0; k < teams.length; k++){
					if(teams[k].name == array[j]){
						points += teams[k].point
					}
				}
			}
			apostadores[i].pontuacao = points;
		}
	};

	return CadastroOuEdicaoBar;

})();

/**
 * @name Funcao para executar funcao construtora
 *
 *
 * @author Emerson Davi
 **/
$(function() {

	cadastroOuEdicaoBar = new BomBar.CadastroOuEdicaoBar();
	cadastroOuEdicaoBar.iniciar();

});
