package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Represents an alert in the Android app, typically received from a backend API.
 */
@AllArgsConstructor
@Getter
@Setter
public class Alerte {
    @SerializedName("id")
    private long id;

    @SerializedName("type")
    private TypeAlert type;

    @SerializedName("message")
    private String message;

    @SerializedName("estResolue")
    private boolean estResolue;

    @SerializedName("dateAlerte")
    private String dateAlerte; // Consider using LocalDateTime with Gson Java 8 support

    @SerializedName("lot")
    private Lot lot;
}