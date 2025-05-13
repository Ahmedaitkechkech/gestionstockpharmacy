package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Represents a batch/lot of medicine with details like expiration date, quantity, and associated movements/alerts.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Lot {
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