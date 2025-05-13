package ma.emsi.frontendmobile.api;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

// Gère l'instance unique de Retrofit avec les intercepteurs essentiels (logs, authentification, vérification réseau).
public class RetrofitClient {
    private static Retrofit retrofit = null;
    private static final String BASE_URL = Constants.BASE_URL;

    public static ApiService getApiService(String token) {
        if (retrofit == null) {
            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(chain -> {
                        // Ajout du token d'authentification
                        Request request = chain.request().newBuilder()
                                .addHeader("Authorization", "Bearer " + token)
                                .build();
                        return chain.proceed(request);
                    })
                    .connectTimeout(30, TimeUnit.SECONDS)
                    .readTimeout(30, TimeUnit.SECONDS)
                    .build();

            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(client)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ApiService.class);
    }
}