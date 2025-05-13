package org.example.gestion_stock.model;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;
    private String username;
    private String passwordHash;
    private String email;
    private String statut ;
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(){}
    public User(long id, String username, String passwordHash, String email, String statut ,   Role role) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.statut = statut;
        this.role = role;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
