package ee.jara.backend.controller;


import ee.jara.backend.entity.Person;
import ee.jara.backend.entity.PersonRole;
import ee.jara.backend.model.AuthToken;
import ee.jara.backend.model.LoginData;
import ee.jara.backend.repository.PersonRepository;
import ee.jara.backend.security.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    JwtTokenService jwtTokenService;

    @PostMapping("signup")
    public Person signup(@RequestBody Person person) {
        if (person.getEmail() == null || person.getEmail().isEmpty()) {
            throw new RuntimeException("Email is required");

        }
        if (person.getPassword() == null || person.getPassword().length() < 6) {
            throw new RuntimeException("Password is required");
        }
      //  person.setRole(PersonRole.CUSTOMER);
        return personRepository.save(person);
    }

    @PostMapping("login")
    public AuthToken login(@RequestBody LoginData loginData) {
        if (loginData.getEmail() == null || loginData.getEmail().isEmpty()) {
            throw new RuntimeException("Email is required");

        }
        if (loginData.getPassword() == null || loginData.getPassword().length() < 6) {
            throw new RuntimeException("Password is required");
        }
        Person person = personRepository.findByEmail(loginData.getEmail());
        if (person == null) {
            throw new RuntimeException("Email is not registered");
        }
        if (!person.getPassword().equals(loginData.getPassword())) {
            throw new RuntimeException("Passwords don't match");
        }
        return jwtTokenService.generateJwtToken(person.getId());
    }

    @GetMapping("person")
    public Person getPerson(){
        Long id = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());
        return personRepository.findById(id).orElseThrow();
    }
}
