package ma.emsi.frontendmobile.api;

import java.util.List;

import ma.emsi.frontendmobile.models.Alerte;
import ma.emsi.frontendmobile.models.auth.AuthRequest;
import ma.emsi.frontendmobile.models.auth.AuthResponse;
import ma.emsi.frontendmobile.models.Log;
import ma.emsi.frontendmobile.models.Lot;
import ma.emsi.frontendmobile.models.Medicin;
import ma.emsi.frontendmobile.models.MouvementStock;
import ma.emsi.frontendmobile.models.auth.RegisterRequest;
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
    // ----------------------- Connexion & Register ------------------------
    @POST("auth/login")
    Call<AuthResponse> login(@Body AuthRequest request);
    @POST("auth/register")
    Call<String> register(@Body RegisterRequest request);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // ------------------------------- User --------------------------------
    @POST("users")
    Call<User> createUser(@Body User newUser);
    @DELETE("users/{id}")
    Call<Void> deleteUser(@Path("id") Long id);
    @GET("users")
    Call<List<User>> getAllUsers();
    @GET("users/{id}")
    Call<User> getUserById(@Path("id") Long id);
    @PUT("users/{id}")
    Call<User> updateUser(@Path("id") Long id, @Body User updatedUser);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // -------------------------- MouvementStock ---------------------------
    @POST("mouvements")
    Call<MouvementStock> createMouvement(@Body MouvementStock mouvementStock);
    @GET("mouvements")
    Call<List<MouvementStock>> getAllMouvements();
    @GET("mouvements/{id}")
    Call<MouvementStock> getMouvementById(@Path("id") Long id);
    @PUT("mouvements/{id}")
    Call<MouvementStock> updateMouvement(@Path("id") Long id, @Body MouvementStock mouvementStock);
    @DELETE("mouvements/{id}")
    Call<Void> deleteMouvement(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // -------------------------------- Log --------------------------------
    @POST("log")
    Call<Log> createLog(@Body Log log);
    @GET("log")
    Call<List<Log>> getAllLogs();
    @GET("log/{id}")
    Call<Log> getLogById(@Path("id") Long id);
    @PUT("log/{id}")
    Call<Log> updateLog(@Path("id") Long id, @Body Log log);
    @DELETE("log/{id}")
    Call<Void> deleteLog(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // -------------------------------- Lot --------------------------------
    @POST("lots")
    Call<Lot> createLot(@Body Lot lot);
    @GET("lots")
    Call<List<Lot>> getAllLots();
    @GET("lots/{id}")
    Call<Lot> getLotById(@Path("id") Long id);
    @PUT("lots/{id}")
    Call<Lot> updateLot(@Path("id") Long id, @Body Lot lot);
    @DELETE("lots/{id}")
    Call<Void> deleteLot(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // ------------------------------ Medicin ------------------------------
    @POST("medicins")
    Call<Medicin> createMedicin(@Body Medicin newMedicin);
    @GET("medicins")
    Call<List<Medicin>> getAllMedicins();
    @GET("medicins/{id}")
    Call<Medicin> getMedicinById(@Path("id") Long id);
    @DELETE("medicins/{id}")
    Call<Void> deleteMedicin(@Path("id") Long id);
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // ------------------------------- Alerte ------------------------------
    @POST("alertes")
    Call<Alerte> createAlerte(@Body Alerte alerte);
    @GET("alertes")
    Call<List<Alerte>> getAllAlertes();
    @GET("alertes/{id}")
    Call<Alerte> getAlerteById(@Path("id") Long id);
    @PUT("alertes/{id}")
    Call<Alerte> updateAlerte(@Path("id") Long id, @Body Alerte alerte);
    @DELETE("alertes/{id}")
    Call<Void> deleteAlerte(@Path("id") Long id);
    // ---------------------------------------------------------------------
}