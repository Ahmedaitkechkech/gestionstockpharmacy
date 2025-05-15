package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;


/**
 * Represents a User in the Android app, typically received from a backend API.
 */
public class User implements Serializable {
    @SerializedName("id")
    private long id;
    @SerializedName("username")
    private String username;
    @SerializedName("passwordHash")
    private String passwordHash;
    @SerializedName("email")
    private String email;
    @SerializedName("role")
    private Role role;
    @SerializedName("statut")
    private Statut statut;

    // ✅ Constructeur avec ID (pour Retrofit)
    public User(long id, String username, String passwordHash, String email, Role role, Statut statut) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.role = role;
        this.statut = statut;
    }

    // ✅ Constructeur sans ID (pour les requêtes POST)
    public User(String username, String passwordHash, String email, Role role) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.role = role;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }
}