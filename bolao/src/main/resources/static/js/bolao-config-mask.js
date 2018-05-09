/**
 * @name função que seta algumas mascáras para serem utilizadas nos forms.
 *
 * @description Configura mascara de cpf, números, cep e etc para serem aplicadas em inputs de acordo com a classe css.
 *
 *
 * @author Emerson Davi
 **/
$(document).ready(function() {
    $('.js-number-phoneandcell').mask('(00) 000000000');
    $('.js-cnpj').mask('00.000.000/0000-00');
    $('.js-number').mask('0#');
    $('.js-hour').mask('00:00');
    $('.js-cep').mask('00000-000');
});
