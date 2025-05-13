package org.example.gestion_stock.controller;

import org.example.gestion_stock.model.User;
import org.example.gestion_stock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userrepo;

    @PostMapping
    public User createUser(@RequestBody User newUser) {
        return userrepo.save(newUser);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userrepo.deleteById(id);
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userrepo.findAll();
    }
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userrepo.findById(id).get();
    }
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) { return this.userrepo.save(updatedUser); }
}
