package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Represents an alert in the Android app, typically received from a backend API.
 */
@AllArgsConstructor
@Getter
@Setter
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
    private String dateAlerte; // Consider using LocalDateTime with Gson Java 8 support

    @SerializedName("lot")
    private Lot lot;
}