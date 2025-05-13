package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a stock movement (e.g., addition/removal of medicine from inventory).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MouvementStock implements Serializable {
    @SerializedName("id")
    private long id;

    @SerializedName("motif")
    private String motif;

    @SerializedName("dateMouvement")
    private String dateMouvement; // Use LocalDateTime if Java 8+ and Gson supports it

    @SerializedName("type")
    private TypeMouvement type;

    @SerializedName("lot")
    private Lot lot;

    @SerializedName("utilisateur")
    private User utilisateur;

    @SerializedName("quantite")
    private int quantite;
}