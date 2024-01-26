package com.example.demo;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {


	@Bean
	public CommandLineRunner demo(PersonsRepository
										  repository) {
		return (args) -> {
			repository.save(new Person("John", "Doe","IT"));
			repository.save(new Person("John",
					"Smith","tester"));
			repository.findAll().forEach(customer -> {
				System.out.println((customer.toString()));
			});
		};
	};

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}


}
