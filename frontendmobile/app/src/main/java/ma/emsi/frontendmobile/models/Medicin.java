package ma.emsi.frontendmobile.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

/**
 * Represents a Medicin entity with details like name, description, and associated lots.
 */

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

    // ✅ Constructeur sans argument (pour Retrofit/Gson)
    public Medicin() {}

    // ✅ Constructeur complet (pour tests ou données préchargées)
    public Medicin(int id, String name, String description, String codeBarres,
                   String categorie, String fabriquant, Integer seuilAlerte, List<Lot> lots) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.codeBarres = codeBarres;
        this.categorie = categorie;
        this.fabriquant = fabriquant;
        this.seuilAlerte = seuilAlerte;
        this.lots = lots;
    }

    // ✅ Constructeur simplifié (pour tests)
    public Medicin(String name, String categorie, Integer seuilAlerte) {
        this.name = name;
        this.categorie = categorie;
        this.seuilAlerte = seuilAlerte;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCodeBarres() {
        return codeBarres;
    }

    public void setCodeBarres(String codeBarres) {
        this.codeBarres = codeBarres;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getFabriquant() {
        return fabriquant;
    }

    public void setFabriquant(String fabriquant) {
        this.fabriquant = fabriquant;
    }

    public Integer getSeuilAlerte() {
        return seuilAlerte;
    }

    public void setSeuilAlerte(Integer seuilAlerte) {
        this.seuilAlerte = seuilAlerte;
    }

    public List<Lot> getLots() {
        return lots;
    }

    public void setLots(List<Lot> lots) {
        this.lots = lots;
    }
}