package br.com.accenture.bolao.enums;

public enum Grupo {
	GRUPO_1(1, "Grupo 1"),
	GRUPO_2(2, "Grupo 2");

	private final String descricao;

	private final Integer codigo;

	Grupo(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}

	public Integer getCodigo() {
		return codigo;
	}
}
