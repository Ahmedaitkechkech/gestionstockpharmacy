package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a log entry tracking user actions in the system.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Log implements Serializable {
    @SerializedName("id")
    private long id;

    @SerializedName("action")
    private String action;

    @SerializedName("dateAction")
    private String dateAction; // Use LocalDateTime if Java 8+ and Gson supports it

    @SerializedName("utilisateur")
    private User utilisateur;
}