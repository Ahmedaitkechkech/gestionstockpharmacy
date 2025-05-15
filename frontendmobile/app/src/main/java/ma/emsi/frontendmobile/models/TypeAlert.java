package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

/**
 * Enum representing the type of alert.
 */
public enum TypeAlert {
    @SerializedName("STOCK")
    STOCK,
    @SerializedName("EXPIRATION")
    EXPIRATION,

}