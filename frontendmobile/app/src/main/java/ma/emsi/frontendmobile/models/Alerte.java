package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Represents an alert in the Android app, typically received from a backend API.
 */
public class Alerte implements Serializable {
    @SerializedName("id")
    private long id;
    @SerializedName("type")
    private TypeAlert type;
    @SerializedName("message")
    private String message;
    @SerializedName("estResolue")
    private boolean estResolue;
    @SerializedName("dateAlerte")
    private LocalDateTime dateAlerte;
    @SerializedName("lot")
    private Lot lot;

    public Alerte(long id, TypeAlert type, String message, boolean estResolue, LocalDateTime dateAlerte, Lot lot) {
        this.id = id;
        this.type = type;
        this.message = message;
        this.estResolue = estResolue;
        this.dateAlerte = dateAlerte;
        this.lot = lot;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TypeAlert getType() {
        return type;
    }

    public void setType(TypeAlert type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isEstResolue() {
        return estResolue;
    }

    public void setEstResolue(boolean estResolue) {
        this.estResolue = estResolue;
    }

    public LocalDateTime getDateAlerte() {
        return dateAlerte;
    }

    public void setDateAlerte(LocalDateTime dateAlerte) {
        this.dateAlerte = dateAlerte;
    }

    public Lot getLot() {
        return lot;
    }

    public void setLot(Lot lot) {
        this.lot = lot;
    }
}