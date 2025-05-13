package ma.emsi.frontendmobile.api;

import java.util.List;

import ma.emsi.frontendmobile.models.Alerte;
import ma.emsi.frontendmobile.models.Log;
import ma.emsi.frontendmobile.models.Lot;
import ma.emsi.frontendmobile.models.Medicin;
import ma.emsi.frontendmobile.models.MouvementStock;
import ma.emsi.frontendmobile.models.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

// Centralise tous les endpoints de l'API dans une seule interface.
public interface ApiService {
    // ---------------------------------------------------------------------
    // User
    // Créer un utilisateur
    @POST("users")
    Call<User> createUser(@Body User user);

    // Supprimer un utilisateur par ID
    @DELETE("users/{id}")
    Call<Void> deleteUser(@Path("id") Long id);

    // Récupérer tous les utilisateurs
    @GET("users")
    Call<List<User>> getAllUsers();

    // Récupérer un utilisateur par ID
    @GET("users/{id}")
    Call<User> getUserById(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // MouvementStock
    // Créer un mouvement de stock
    @POST("mouvements")
    Call<MouvementStock> createMouvement(@Body MouvementStock mouvement);

    // Récupérer tous les mouvements
    @GET("mouvements")
    Call<List<MouvementStock>> getAllMouvements();

    // Récupérer un mouvement par ID
    @GET("mouvements/{id}")
    Call<MouvementStock> getMouvementById(@Path("id") Long id);

    // Mettre à jour un mouvement
    @PUT("mouvements/{id}")
    Call<MouvementStock> updateMouvement(@Path("id") Long id, @Body MouvementStock mouvement);

    // Supprimer un mouvement
    @DELETE("mouvements/{id}")
    Call<Void> deleteMouvement(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // Log
    // Créer un log
    @POST("log")
    Call<Log> createLog(@Body Log log);

    // Récupérer tous les logs
    @GET("log")
    Call<List<Log>> getAllLogs();

    // Récupérer un log par ID
    @GET("log/{id}")
    Call<Log> getLogById(@Path("id") Long id);

    // Mettre à jour un log
    @PUT("log/{id}")
    Call<Log> updateLog(@Path("id") Long id, @Body Log log);

    // Supprimer un log
    @DELETE("log/{id}")
    Call<Void> deleteLog(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // Lot
    // Créer un lot
    @POST("lots")
    Call<Lot> createLot(@Body Lot lot);

    // Récupérer tous les lots
    @GET("lots")
    Call<List<Lot>> getAllLots();

    // Récupérer un lot par ID
    @GET("lots/{id}")
    Call<Lot> getLotById(@Path("id") Long id);

    // Mettre à jour un lot
    @PUT("lots/{id}")
    Call<Lot> updateLot(@Path("id") Long id, @Body Lot lot);

    // Supprimer un lot
    @DELETE("lots/{id}")
    Call<Void> deleteLot(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // Medicin
    // Créer un médicament
    @POST("medicins")
    Call<Medicin> createMedicin(@Body Medicin medicin);

    // Récupérer tous les médicaments
    @GET("medicins")
    Call<List<Medicin>> getAllMedicins();

    // Récupérer un médicament par ID
    @GET("medicins/{id}")
    Call<Medicin> getMedicinById(@Path("id") Long id);

    // Supprimer un médicament par ID
    @DELETE("medicins/{id}")
    Call<Void> deleteMedicin(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // Alerte
    // Créer une alerte
    @POST("alertes")
    Call<Alerte> createAlerte(@Body Alerte alerte);

    // Récupérer toutes les alertes
    @GET("alertes")
    Call<List<Alerte>> getAllAlertes();

    // Récupérer une alerte par ID
    @GET("alertes/{id}")
    Call<Alerte> getAlerteById(@Path("id") Long id);

    // Mettre à jour une alerte
    @PUT("alertes/{id}")
    Call<Alerte> updateAlerte(@Path("id") Long id, @Body Alerte alerte);

    // Supprimer une alerte
    @DELETE("alertes/{id}")
    Call<Void> deleteAlerte(@Path("id") Long id);
    // ---------------------------------------------------------------------

}