package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.entity.Person;
import ra.ecommerceapi.repository.IPersonRepo;
import ra.ecommerceapi.service.IPersonService;

import java.util.List;
@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements IPersonService {
    private final IPersonRepo personRepository;

    @Override
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    @Override
    public Person addPerson(Person person) {
        return personRepository.save(person);
    }
}
