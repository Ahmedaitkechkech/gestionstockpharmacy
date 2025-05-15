package ma.emsi.frontendmobile.models.auth;

import ma.emsi.frontendmobile.models.Role;
import ma.emsi.frontendmobile.models.Statut;

public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private Role role;
    private Statut statut;

    public RegisterRequest(String username, String password, String email, Role role, Statut statut) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.statut = statut;
    }

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public Statut getStatut() { return statut; }
}
