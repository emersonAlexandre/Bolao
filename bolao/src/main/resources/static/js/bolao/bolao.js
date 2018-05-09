var Bolao = Bolao || {}

/**
 * @name função construtora para utilizar algumas funções js no formulário de cadastroBar.html
 *
 * @description
 * Nesta funcao sao aplicadas algumas regras para preenchimento do formulário de bar
 *
 * @author Emerson Davi
 **/
Bolao.CadastroOuEdicaoApostador = (function() {

	/**
	 * Referências aos componentes da página
	 */
	function CadastroOuEdicaoApostador() {
		this.btnDelete = $('#deleteApostador');
		this.btnEdit = $('#link_edit');
		this.formDelete = $('#form-delete');
//		this.btnGenerate = $('#gerar-ranking');
//		this.urlTimes = '/apostadores/listatimes';
		this.urlGetApostador = '/apostadores/getApostador';
//		this.listaTimes = [];
		this.selectTimes = $('#times');
//		this.tabela = document.getElementById('tabela-apostadores').getElementsByTagName('tbody')[0];
	};

	/**
	 * Função que é inicializada assim que a página que está utilizando este arquivo js, é acessada, onde nela contém uma função que é acionada conforme hà mudanças no select de estados, e outra que é acionada no momento em que o botão remover é clicado
	 */
	CadastroOuEdicaoApostador.prototype.iniciar = function() {
//		this.btnDelete.on('click', openConfirmaRemocao.bind(this));
//		this.btnGenerate.on('click', generatePunctuation.bind(this));
		setarMultipleSelect(this);
	}
	
	/**
	 * Função responsável por abrir o modal de confirmação de remoção
	 */
	function openConfirmaRemocao() {
		var mainContext = this;
		swal({
			title: "Tem certeza?",
			text: "Você não poderá recuperar o item após a exclusão.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Sim, exclua agora!",
			confirmButtonClass: "js-confirm",
			closeOnConfirm: false,
			showLoaderOnConfirm: true,
			buttonsStyling: false
		},
		function(isConfirm) {
			if (isConfirm) {
				mainContext.formDelete.submit();
				swal("Removido!", "O item foi removido com sucesso.", "success");
			} else {
				swal("Cancelado", "A remoção do item foi cancelada.", "error");
			}
		});
	};
	
	function setarMultipleSelect(){
		console.log("passou");
		if(!document.getElementById("apostador-id").value.isEmpty){
			getApostador(this);
		}
	};
	
	function getApostador() {
		console.log("passou");
		$.ajax({
			dataType: 'json',
			url: "/apostadores/getApostador/" + document.getElementById("apostador-id").value,
			method: 'GET',
			success: successApostador.bind(this),
		});
	};
	
//	function generatePunctuation() {
//		$.ajax({
//			dataType: 'json',
//			url: this.urlTimes,
//			method: 'GET',
//			success: sucessTimes.bind(this),
//		});
//	};

	/**
	 * Função que é responsável por popular o select de cidades na página cadastroBar.html conforme a lista de cidades em formato JSON que recebe por parâmetro
	 */
//	function sucessTimes(data) {
//
//		this.listaTimes = data;
//		
//		var teams = [];
//		
//		alert(this.tabela.rows);
//
//		for (var i = 0; i < this.listaTimes.length; i++) {
//			
//			this.selectCidade.append('<option value="' + this.listaCidade[i].id + '">' + this.listaCidade[i].nome + '</option>');
//		}
//
//	};
	
	function successApostador(data) {
		var apostador = data;
		var times = apostador.times.split(",");
		
		console.log(apostador.times);

	};

	return CadastroOuEdicaoApostador;

})();

/**
 * @name Funcao para executar funcao construtora
 *
 *
 * @author Emerson Davi
 **/
$(function() {

	cadastroOuEdicaoApostador = new Bolao.CadastroOuEdicaoApostador();
	cadastroOuEdicaoApostador.iniciar();

});
