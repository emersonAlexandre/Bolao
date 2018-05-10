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
		this.urlGetApostador = '/apostadores/getApostador';
		this.selectTimes = $('#times');
	};

	/**
	 * Função que é inicializada assim que a página que está utilizando este arquivo js, é acessada, onde nela contém uma função que é acionada conforme hà mudanças no select de estados, e outra que é acionada no momento em que o botão remover é clicado
	 */
	CadastroOuEdicaoApostador.prototype.iniciar = function() {
		this.btnDelete.on('click', openConfirmaRemocao.bind(this));
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
		if(document.getElementById("apostador-id").value != ""){
			getApostador(this);
		}
	};

	function getApostador() {
		$.ajax({
			dataType: 'json',
			url: "/apostadores/getApostador/" + document.getElementById("apostador-id").value,
			method: 'GET',
			success: successApostador.bind(this),
		});
	};

	function successApostador(data) {
		var apostador = data;
		var times = apostador.times.split(",");
		for(i = 0; i < times.length; i++){
			for(j = 0; j < document.getElementById("times").options.length; j++){
				if(document.getElementById("times").options[j].value == times[i]){
					document.getElementById("times").options[j].selected = true;
				}
			}
		}

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
