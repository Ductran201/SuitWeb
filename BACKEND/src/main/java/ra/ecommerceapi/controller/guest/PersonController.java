package ra.ecommerceapi.controller.guest;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.entity.Person;
import ra.ecommerceapi.service.IPersonService;

import java.util.List;

@RestController
@RequestMapping("api.com/v2/persons")
@RequiredArgsConstructor
public class PersonController {
    private final IPersonService personService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("")
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    @PostMapping("")
    public Person addPerson(@RequestBody Person person) {
        Person savedPerson = personService.addPerson(person);
        messagingTemplate.convertAndSend("/topic/persons", savedPerson);
        return savedPerson;
    }

}
