package ma.emsi.frontendmobile.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.api.RetrofitClient;
import ma.emsi.frontendmobile.models.auth.AuthRequest;
import ma.emsi.frontendmobile.models.auth.AuthResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    private EditText inputUsername, inputPassword;
    private Button btnLogin;
    private TextView linkRegister;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        inputUsername = findViewById(R.id.input_username);
        inputPassword = findViewById(R.id.input_password);
        btnLogin = findViewById(R.id.btn_login);
        linkRegister = findViewById(R.id.link_register);

        btnLogin.setOnClickListener(v -> {
            String username = inputUsername.getText().toString().trim();
            String password = inputPassword.getText().toString().trim();

            if (validateInputs(username, password)) {
                AuthRequest request = new AuthRequest(username, password);
                Call<AuthResponse> call = RetrofitClient.getApiService().login(request);
                call.enqueue(new Callback<AuthResponse>() {
                    @Override
                    public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                        if (response.isSuccessful()) {
                            String token = response.body().getToken();
                            // Stocker le token et rediriger
                            startActivity(new Intent(LoginActivity.this, MainActivity.class));
                        } else {
                            Toast.makeText(LoginActivity.this, "Connexion échouée", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<AuthResponse> call, Throwable t) {
                        Toast.makeText(LoginActivity.this, "Erreur réseau", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        linkRegister.setOnClickListener(v -> {
            startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
        });
    }

    private boolean validateInputs(String username, String password) {
        if (username.isEmpty()) {
            inputUsername.setError("Nom d'utilisateur requis");
            return false;
        }
        if (password.isEmpty()) {
            inputPassword.setError("Mot de passe requis");
            return false;
        }
        return true;
    }
}