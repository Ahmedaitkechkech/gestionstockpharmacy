package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

/**
 * Represents a Medicin entity with details like name, description, and associated lots.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Medicin implements Serializable {
    @SerializedName("id")
    private int id;

    @SerializedName("name")
    private String name;

    @SerializedName("description")
    private String description;

    @SerializedName("codeBarres")
    private String codeBarres;

    @SerializedName("categorie")
    private String categorie;

    @SerializedName("fabriquant")
    private String fabriquant;

    @SerializedName("seuilAlerte")
    private Integer seuilAlerte;

    @SerializedName("lots")
    private List<Lot> lots;
}