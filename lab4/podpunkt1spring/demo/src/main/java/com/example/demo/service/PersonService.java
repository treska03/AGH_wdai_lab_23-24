package com.example.demo.service;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PersonService {
    public List<Person> getPersons();
    public Person getPerson(String surname);
    public Person create(String name, String surname, String job);
    public Person getPerson(Long id);

}