package br.com.accenture.bolao.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.accenture.bolao.enums.Grupo;
import br.com.accenture.bolao.enums.Times;
import br.com.accenture.bolao.exception.ApostadorJaExisteException;
import br.com.accenture.bolao.model.Apostador;
import br.com.accenture.bolao.repository.ApostadorRepository;
import br.com.accenture.bolao.scrap.config.pages.TabelaSerieAPage;
import br.com.accenture.bolao.service.ApostadorService;

@Controller
@RequestMapping("/apostadores")
public class ApostadorController {

	@Autowired
	ApostadorRepository repository;

	@Autowired
	ApostadorService service;

	@Autowired
	TabelaSerieAPage page;

	@RequestMapping("/novo")
	public ModelAndView novo(Apostador apostador) {
		ModelAndView mv = new ModelAndView("cadastroApostador");
		mv.addObject("grupos", Grupo.values());
		mv.addObject("times", Times.values());
		return mv;
	}

	@RequestMapping(value = { "/novo", "{\\d+}" }, method = RequestMethod.POST)
	public ModelAndView salvar(@Valid Apostador apostador, BindingResult result, Model model,
			RedirectAttributes attributes) {

		if (result.hasErrors()) {
			model.addAttribute(apostador);
			return novo(apostador);
		}

		String msg = "";

		if (apostador.getId() != null) {
			msg += "Apostador atualizado com sucesso";
		} else {
			msg += "Apostador salvo com sucesso";
		}

		try {
			service.salvar(apostador, attributes);
		} catch (ApostadorJaExisteException e) {
			msg = "";
			msg += "Erro! " + e.getMessage();
		}

		attributes.addFlashAttribute("message", msg);

		if (msg.contains("Erro")) {
			model.addAttribute(apostador);
			model.addAttribute("message", msg);
			return novo(apostador);
		}

		else {
			return new ModelAndView("redirect:/apostadores");
		}
	}

	@RequestMapping(value = "/atualizar", method = RequestMethod.POST)
	public void salvar(@RequestBody List<Apostador> apostadores, BindingResult result, Model model,
			RedirectAttributes attributes) {
		service.atualizarApostadores(apostadores);

	}

	@GetMapping("/{id}")
	public ModelAndView editar(@PathVariable("id") Long id) {
		Apostador apostador = repository.findOne(id);
		ModelAndView mv = novo(apostador);
		mv.addObject(apostador);
		return mv;
	}

	@RequestMapping
	public ModelAndView listar() {
		ModelAndView mv = new ModelAndView("apostadores");
		mv.addObject("apostadores", service.buscarApostadores());
		return mv;
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public String excluir(@PathVariable Long id, RedirectAttributes attributes) {
		repository.delete(id);
		attributes.addFlashAttribute("message", "Apostador excluído com sucesso");
		return "redirect:/apostadores";
	}

	@RequestMapping(value = "/listaapostadores", method = RequestMethod.GET)
	public @ResponseBody List<Apostador> buscarApostadores() {
		return service.buscarApostadores();
	}

	@RequestMapping(value = "/getApostador/{id}", method = RequestMethod.GET)
	public @ResponseBody Apostador buscarApostadorPorId(@PathVariable("id") Long id) {
		return repository.findOne(id);
	}

}