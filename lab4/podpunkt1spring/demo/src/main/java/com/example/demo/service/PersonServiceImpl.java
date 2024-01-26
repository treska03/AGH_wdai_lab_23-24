package com.example.demo.service;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PersonServiceImpl implements PersonService{


    @Autowired
    private PersonsRepository personsRepository;

    @Override
    @RequestMapping("/person/")
    public List<Person> getPersons() {
        return (List<Person>) personsRepository.findAll();
    }

    @Override
    public Person getPerson(@RequestParam("name") String surname) {
        return personsRepository.findBySurname(surname).get(0);
    }

    @Override
    @RequestMapping("/person/{id}")
    public Person getPerson(@PathVariable Long id) {
        return personsRepository.findById(id).orElse(null);
    }

    @Override
    @RequestMapping("/create")
    public Person create(@RequestParam("name") String name,
                         @RequestParam("surname") String surname,
                         @RequestParam("job") String job
    ) {
        return personsRepository.save(new Person(name, surname, job));
    }


}
