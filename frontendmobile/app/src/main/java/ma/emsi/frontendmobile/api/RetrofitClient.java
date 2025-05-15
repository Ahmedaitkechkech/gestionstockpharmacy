package ma.emsi.frontendmobile.api;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {
    private static Retrofit retrofit = null;
    private static Retrofit unauthenticatedRetrofit = null;

    public static ApiService getApiService() {
        if (unauthenticatedRetrofit == null) {
            unauthenticatedRetrofit = new Retrofit.Builder()
                    .baseUrl(Constants.BASE_URL)
                    .client(createOkHttpClient(null))
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return unauthenticatedRetrofit.create(ApiService.class);
    }

    public static ApiService getAuthenticatedApiService(String token) {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(Constants.BASE_URL)
                    .client(createOkHttpClient(token))
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ApiService.class);
    }

    private static OkHttpClient createOkHttpClient(String token) {
        OkHttpClient.Builder builder = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS);

        // Intercepteur d'authentification
        if (token != null && !token.isEmpty()) {
            builder.addInterceptor(chain -> {
                Request request = chain.request().newBuilder()
                        .addHeader("Authorization", "Bearer " + token)
                        .build();
                return chain.proceed(request);
            });
        }

        return builder.build();
    }
}