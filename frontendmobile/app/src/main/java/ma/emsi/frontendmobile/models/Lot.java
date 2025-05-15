package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

/**
 * Represents a batch/lot of medicine with details like expiration date, quantity, and associated movements/alerts.
 */
public class Lot implements Serializable {
    public Lot(long id, String numeroLot, String dateExpiration, Integer quantite, String dateEntree, Medicin medicin, List<MouvementStock> mouvements, List<Alerte> alertes) {
        this.id = id;
        this.numeroLot = numeroLot;
        this.dateExpiration = dateExpiration;
        this.quantite = quantite;
        this.dateEntree = dateEntree;
        this.medicin = medicin;
        this.mouvements = mouvements;
        this.alertes = alertes;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNumeroLot() {
        return numeroLot;
    }

    public void setNumeroLot(String numeroLot) {
        this.numeroLot = numeroLot;
    }

    public String getDateExpiration() {
        return dateExpiration;
    }

    public void setDateExpiration(String dateExpiration) {
        this.dateExpiration = dateExpiration;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public String getDateEntree() {
        return dateEntree;
    }

    public void setDateEntree(String dateEntree) {
        this.dateEntree = dateEntree;
    }

    public Medicin getMedicin() {
        return medicin;
    }

    public void setMedicin(Medicin medicin) {
        this.medicin = medicin;
    }

    public List<MouvementStock> getMouvements() {
        return mouvements;
    }

    public void setMouvements(List<MouvementStock> mouvements) {
        this.mouvements = mouvements;
    }

    public List<Alerte> getAlertes() {
        return alertes;
    }

    public void setAlertes(List<Alerte> alertes) {
        this.alertes = alertes;
    }

    @SerializedName("id")
    private long id;

    @SerializedName("numeroLot")
    private String numeroLot;

    @SerializedName("dateExpiration")
    private String dateExpiration; // Use LocalDateTime if Java 8+ and Gson supports it

    @SerializedName("quantite")
    private Integer quantite;

    @SerializedName("dateEntree")
    private String dateEntree; // Use LocalDateTime if Java 8+ and Gson supports it

    @SerializedName("medicin")
    private Medicin medicin;

    @SerializedName("mouvements")
    private List<MouvementStock> mouvements;

    @SerializedName("alertes")
    private List<Alerte> alertes;
}