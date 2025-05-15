package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Represents a log entry tracking user actions in the system.
 */
public class Log implements Serializable {
    @SerializedName("id")
    private long id;
    @SerializedName("action")
    private String action;
    @SerializedName("quantite")
    private Integer quantite;
    @SerializedName("dateAction")
    private LocalDateTime dateAction;
    @SerializedName("utilisateur")
    private User utilisateur;

    public Log(long id, String action, Integer quantite, LocalDateTime dateAction, User utilisateur) {
        this.id = id;
        this.action = action;
        this.quantite = quantite;
        this.dateAction = dateAction;
        this.utilisateur = utilisateur;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public LocalDateTime getDateAction() {
        return dateAction;
    }

    public void setDateAction(LocalDateTime dateAction) {
        this.dateAction = dateAction;
    }

    public User getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(User utilisateur) {
        this.utilisateur = utilisateur;
    }
}