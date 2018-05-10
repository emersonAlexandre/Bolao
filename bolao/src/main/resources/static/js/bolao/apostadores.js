var Bolao = Bolao || {}

/**
 * @name função construtora para utilizar algumas funções js no formulário de cadastroBar.html
 *
 * @description
 * Nesta funcao sao aplicadas algumas regras para preenchimento do formulário de bar
 *
 * @author Emerson Davi
 **/
Bolao.ListaDeApostadores = (function() {

	/**
	 * Referências aos componentes da página
	 */
	function ListaDeApostadores() {
		this.btnGenerate = $('#gerar-ranking');
		this.urlApostadores = '/apostadores/listaApostadores';
		this.listaApostadores = [];
	};

	/**
	 * Função que é inicializada assim que a página que está utilizando este arquivo js, é acessada, onde nela contém uma função que é acionada conforme hà mudanças no select de estados, e outra que é acionada no momento em que o botão remover é clicado
	 */
	ListaDeApostadores.prototype.iniciar = function() {
		pegarDadosDaPagina(this);
//		this.btnGenerate.on('click', gerarPontuacao.bind(this));
	}

	function getApostadores() {
		$.ajax({
			dataType: 'json',
			url: this.urlApostadores,
			method: 'GET',
			success: sucessApostasdores.bind(this),
		});
	};

	function successApostadores(){
		this.listaApostadores = data;
	};

	function pegarDadosDaPagina(){
		$.ajax({
			method: "GET",
			url: "https://www.cbf.com.br/competicoes/brasileiro-serie-a/classificacao/2018#.WvH3mIjwbIV ",
			success: successGetDataSite.bind(this)
		});
	};
	
	function successGetDataSite(data){
		$('#copia').html($(data).find('tbody').html());
	};
	
	function salvarApostadores(){
		$.ajax({
            type: "POST",
            url: "/apostadores/atualizar",
            contentType: "application/json; charset=utf-8",
            data: this.listaApostadores,
            dataType: "json"
            });
	};

	/**
	 * Função que é responsável por popular o select de cidades na página cadastroBar.html conforme a lista de cidades em formato JSON que recebe por parâmetro
	 */
	function gerarPontuacao(data) {
		
		var teams = [];

		pegarTimesDaSerieA(teams);
		
		getApostadores(this);

		calcularPontuacao(this);

		salvarApostadores(this);
		
//		this.listaTimes = data;

//		var teams = [];

//		alert(this.tabela.rows);

//		for (var i = 0; i < this.listaTimes.length; i++) {

//		this.selectCidade.append('<option value="' + this.listaCidade[i].id + '">' + this.listaCidade[i].nome + '</option>');
//		}

	};

	function pegarTimesDaSerieA(teams){
		for (i = 2; i <= 21; i++){
			var nomeTime = document.evaluate('//*[@id="copia"]/div[2]/div/div[1]/div[3]/div[1]/table/tbody/tr[' + i + ']/td[3]/span', document, null, XPathResult.STRING_TYPE, null);
			var pointTeam = document.evaluate('//*[@id="copia"]/div[2]/div/div[1]/div[3]/div[1]/table/tbody/tr[' + i + ']/td[4]', document, null, XPathResult.NUMBER_TYPE, null);
			var array = nomeTime.stringValue.trim().split(" -");
			var nameTeam;

			if(nomeTime.stringValue.includes("Atlético") || nomeTime.stringValue.includes("América")){
				nameTeam = nomeTime.stringValue.trim();
			} else{
				nameTeam = array[0];
			}

			teams.push({name : nameTeam, point : pointTeam.numberValue});
		}
	};

	function ordenarRanking(table){
		var apostadores = []

		pegarApostadores(table, apostadores);

		apostadores.sort(compare);

		var cont = 0;

		for(i = 2; i <= table.getElementsByTagName('tbody')[0].rows.length; i++){
			var nome = document.evaluate('//*[@id="' + table.id + '"]/tbody/tr[' + i + ']/td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = apostadores[cont].nome;
			var times = document.evaluate('//*[@id="' + table.id + '"]/tbody/tr[' + i + ']/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = apostadores[cont].times;
			var pontuacao = document.evaluate('//*[@id="' + table.id + '"]/tbody/tr[' + i + ']/td[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = apostadores[cont].pontuacao;
			cont += 1;
		}
	};

	function pegarApostadores(table, apostadores){
		for(i = 2; i <= table.getElementsByTagName('tbody')[0].rows.length; i++){
			var nome = document.evaluate('//*[@id="' + table.id + '"]/tbody/tr[' + i + ']/td[1]', document, null, XPathResult.STRING_TYPE, null);
			var times = document.evaluate('//*[@id="' + table.id + '"]/tbody/tr[' + i + ']/td[2]', document, null, XPathResult.STRING_TYPE, null);
			var pontuacao = document.evaluate('//*[@id="' + table.id + '"]/tbody/tr[' + i + ']/td[3]', document, null, XPathResult.STRING_TYPE, null);
			apostadores.push({nome : nome.stringValue, times : times.stringValue, pontuacao : pontuacao.stringValue});
		}
	};

	function calcularPontuacao(){
		for (i = 0; i <= this.listaApostadores.length; i++){
			var array = this.listaApostadores[i].split(", ");
			var points = 0;
			for(j = 0; j < array.length; j++){
				for(k = 0; k < teams.length; k++){
					if(teams[k].name == array[j]){
						points += teams[k].point
					}
				}
			}

			this.listaApostadores[i].pontuacao = points;
		}
	};

	function compare(a, b) {
		if (a.pontuacao < b.pontuacao){
			return 1;
		} else if (a.pontuacao > b.pontuacao){
			return -1;
		} else{
			return 0;
		}
	};

	return ListaDeApostadores;

})();

/**
 * @name Funcao para executar funcao construtora
 *
 *
 * @author Emerson Davi
 **/
$(function() {

	listaDeApostadores = new Bolao.ListaDeApostadores();
	listaDeApostadores.iniciar();

});
