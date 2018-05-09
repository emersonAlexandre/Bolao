package br.com.accenture.bolao.scrap.config.pages;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.springframework.stereotype.Component;

import br.com.accenture.bolao.model.Time;

@Component
public class TabelaSerieAPage{

	WebDriver driver;

	public List<Time> getResult(){
		driver = new HtmlUnitDriver();

		List<Time> times = new ArrayList<>();

		driver.get("https://globoesporte.globo.com/futebol/brasileirao-serie-a/");

		for(int i = 1; i <= 20; i++) {
			String nomeTime = driver.findElement(By.xpath("//*[@id=\"container-para-tabela-simulador-ou-navegacao-js\"]/article/section[1]/div/table/tbody[" + i + "]/tr/td[2]/strong")).getText();
			Integer pontosTime = Integer.parseInt(driver.findElement(By.xpath("//*[@id=\"container-para-tabela-simulador-ou-navegacao-js\"]/article/section[1]/div/div[1]/table/tbody/tr[" + i + "]/td[1]")).getText());
			times.add(new Time(nomeTime, pontosTime));
		}

		return times;
	}

	public static void main(String[] args) {
		TabelaSerieAPage page = new TabelaSerieAPage();
		System.out.println(page.getResult());
	}

}