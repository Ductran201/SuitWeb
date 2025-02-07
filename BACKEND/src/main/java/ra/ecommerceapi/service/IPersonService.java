package ra.ecommerceapi.service;

import ra.ecommerceapi.model.entity.Person;

import java.util.List;

public interface IPersonService {

     List<Person> getAllPersons();

     Person addPerson(Person person);


}
