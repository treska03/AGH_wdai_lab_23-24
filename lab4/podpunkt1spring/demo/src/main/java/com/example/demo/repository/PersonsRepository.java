package com.example.demo.repository;

import com.example.demo.dao.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonsRepository extends CrudRepository<Person, Long> {
    List<Person> findBySurname(String name);

}
