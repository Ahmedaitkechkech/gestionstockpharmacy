package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Represents a stock movement (e.g., addition/removal of medicine from inventory).
 */

public class MouvementStock implements Serializable {
    @SerializedName("id")
    private long id;
    @SerializedName("motif")
    private String motif;
    @SerializedName("dateMouvement")
    private LocalDateTime dateMouvement;
    @SerializedName("type")
    private TypeMouvement type;
    @SerializedName("lot")
    private Lot lot;
    @SerializedName("utilisateur")
    private User utilisateur;
    @SerializedName("quantite")
    private int quantite;

    public MouvementStock(long id, String motif, LocalDateTime dateMouvement, TypeMouvement type, Lot lot, User utilisateur, int quantite) {
        this.id = id;
        this.motif = motif;
        this.dateMouvement = dateMouvement;
        this.type = type;
        this.lot = lot;
        this.utilisateur = utilisateur;
        this.quantite = quantite;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public LocalDateTime getDateMouvement() {
        return dateMouvement;
    }

    public void setDateMouvement(LocalDateTime dateMouvement) {
        this.dateMouvement = dateMouvement;
    }

    public TypeMouvement getType() {
        return type;
    }

    public void setType(TypeMouvement type) {
        this.type = type;
    }

    public Lot getLot() {
        return lot;
    }

    public void setLot(Lot lot) {
        this.lot = lot;
    }

    public User getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(User utilisateur) {
        this.utilisateur = utilisateur;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}