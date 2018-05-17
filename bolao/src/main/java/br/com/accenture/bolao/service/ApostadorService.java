package br.com.accenture.bolao.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.accenture.bolao.enums.Times;
import br.com.accenture.bolao.model.Apostador;
import br.com.accenture.bolao.repository.ApostadorRepository;

@Service
public class ApostadorService {
	
	@Autowired
	ApostadorRepository repository;
	
	public List<Apostador> buscarApostadores(){
		List<Apostador> apostadores = new ArrayList<>();
		for(Apostador apostador : repository.findAll()) {
			String[] array = apostador.getTimes().split(",");
			String times = "";
			for(int i = 0; i < array.length; i++) {
				times += Times.valueOf(array[i]).getDescricao();
				if(i+1 != array.length) {
					times += ", ";
				}
			}
			apostador.setTimes(times);
			apostadores.add(apostador);
		}
		return apostadores;
	}
	
	public void atualizarApostadores(List<Apostador> apostadores) {
		for (Apostador apostador : apostadores) {
			String times = "";
			String[] array = apostador.getTimes().split(", ");
			for (int i = 0; i < array.length; i++) {
				for (int j = 0; j < Times.values().length; j++) {
					if(Times.values()[j].getDescricao().equals(array[i])) {
						times += Times.values()[j].toString();
					}
				}
				if(i+1 != array.length) {
					times += ",";
				}
			}
			apostador.setTimes(times);
			repository.save(apostador);
		}
	}

}
