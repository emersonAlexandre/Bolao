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
		$.ajax({
			dataType: 'json',
			url: this.urlApostadores,
			method: 'GET',
			success: sucessApostador.bind(this),
		});
	};

	/**
	 * Função que é responsável por popular o select de cidades na página cadastroBar.html conforme a lista de cidades em formato JSON que recebe por parâmetro
	 */
	function sucessApostador(data) {

		this.listaApostadores = data;
		
		

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
