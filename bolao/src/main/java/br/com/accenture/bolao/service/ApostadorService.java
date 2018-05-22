package br.com.accenture.bolao.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.accenture.bolao.enums.Times;
import br.com.accenture.bolao.exception.ApostadorJaExisteException;
import br.com.accenture.bolao.model.Apostador;
import br.com.accenture.bolao.repository.ApostadorRepository;

@Service
public class ApostadorService {

	@Autowired
	ApostadorRepository repository;

	public List<Apostador> buscarApostadores() {
		List<Apostador> apostadores = new ArrayList<>();
		for (Apostador apostador : repository.findAll()) {
			String[] array = apostador.getTimes().split(",");
			String times = "";
			for (int i = 0; i < array.length; i++) {
				times += Times.valueOf(array[i]).getDescricao();
				if (i + 1 != array.length) {
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
					if (Times.values()[j].getDescricao().equals(array[i])) {
						times += Times.values()[j].toString();
					}
				}
				if (i + 1 != array.length) {
					times += ",";
				}
			}
			apostador.setTimes(times);
			repository.save(apostador);
		}
	}

	public void salvar(Apostador apostador, RedirectAttributes attributes) throws ApostadorJaExisteException {
		List<Apostador> apostadores = repository.findAll();
		
		if(apostador.getId() != null) {
			for(int i = 0; i < apostadores.size(); i++) {
				if(apostadores.get(i).getId() == apostador.getId()) {
					apostadores.remove(i);
					break;
				}
			}
		}
		
		for (Apostador apost : apostadores) {
			if (apostador.getNome().equalsIgnoreCase(apost.getNome())) {
				if (apost.getGrupo().equals(apostador.getGrupo())) {
					throw new ApostadorJaExisteException("Já existe um apostador cadastrado no mesmo grupo!");
				}
			}
		}
		
		repository.save(apostador);
	}
}