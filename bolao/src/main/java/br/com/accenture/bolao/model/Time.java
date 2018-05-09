package br.com.accenture.bolao.model;

public class Time {

	private String nome;
	
	private Integer pontuacao;
	
	public Time() {
	
	}
	
	public Time(String nome, Integer pontuacao) {
		super();
		this.nome = nome;
		this.pontuacao = pontuacao;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Integer getPontuacao() {
		return pontuacao;
	}
	public void setPontuacao(Integer pontuacao) {
		this.pontuacao = pontuacao;
	}
	@Override
	public String toString() {
		return "Time [nome=" + nome + ", pontuacao=" + pontuacao + "]";
	}
	
}
