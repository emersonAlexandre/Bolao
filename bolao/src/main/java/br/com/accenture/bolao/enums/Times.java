package br.com.accenture.bolao.enums;

public enum Times {
	FLA(1, "Flamengo"),
	PAL(2, "Palmeiras"),
	COR(3, "Corinthians"),
	VAS(4, "Vasco"),
	GRE(5, "Grêmio"),
	CAM(6, "Atlético-MG"),
	FLU(7, "Fluminense"),
	SPO(8, "Sport"),
	AMG(9, "América-MG"),
	SAO(10, "São Paulo"),
	ATP(11, "Atlético-PR"),
	BOT(12, "Botafogo"),
	INT(13, "Internacional"),
	CRU(14, "Cruzeiro"),
	BAH(15, "Bahia"),
	SAN(16, "Santos"),
	CHA(17, "Chapecoense"),
	CEA(18, "Ceará"),
	VIT(19, "Vitória"),
	PAR(20, "Paraná");

	private final String descricao;

	private final Integer codigo;

	Times(Integer codigo, String descricao) {
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