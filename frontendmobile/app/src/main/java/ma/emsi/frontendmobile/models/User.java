package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a User in the Android app, typically received from a backend API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    @SerializedName("id")
    private long id;

    @SerializedName("username")
    private String username;

    @SerializedName("passwordHash")
    private String passwordHash;

    @SerializedName("email")
    private String email;

    @SerializedName("role")
    private Role role;
}