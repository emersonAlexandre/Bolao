/**
 * Configura jquery datatable para exibir as tabelas com todos campos em portugues (PT-BR).
 * @type {{dataTable: configTabela.dataTable}}
 */
var configTabela = {

    dataTable: function(id) {
        $(id).DataTable({
            "language": {
                "lengthMenu": "Mostrar _MENU_ resultados por página",
                "zeroRecords": "Nenhum dado encontrado durante a busca",
                "info": "Mostrando _PAGE_ de _PAGES_ páginas",
                "infoEmpty": "Não existe nenhum dado",
                "infoFiltered": "(total de dados from _MAX_ total filtrados)",
                "search": "Pesquisar",
                "searchPlaceholder": "Digite para buscar",
                "paginate": {
                    "previous": "<<",
                    "next": ">>"
                },


            },
            "bRetrieve": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">'


        });
    }
}

/**
 * Usando funçao que configura tabela para portugues.
 */
$(document).ready(configTabela.dataTable('#tabela-jqueyDataTable'));
$(document).ready(configTabela.dataTable('#tabela-jqueyDataTable1'));

