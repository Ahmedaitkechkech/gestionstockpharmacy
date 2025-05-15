package ma.emsi.frontendmobile.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.api.RetrofitClient;
import ma.emsi.frontendmobile.models.Role;
import ma.emsi.frontendmobile.models.Statut;
import ma.emsi.frontendmobile.models.auth.RegisterRequest;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
public class RegisterActivity extends AppCompatActivity {
    private EditText inputUsername, inputEmail, inputPassword, inputConfirmPassword;
    private Spinner spinnerRole;
    private Button btnRegister;
    private TextView linkLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        inputUsername = findViewById(R.id.input_username);
        inputEmail = findViewById(R.id.input_email);
        inputPassword = findViewById(R.id.input_password);
        inputConfirmPassword = findViewById(R.id.input_confirm_password);
        spinnerRole = findViewById(R.id.spinner_role);
        btnRegister = findViewById(R.id.btn_register);
        linkLogin = findViewById(R.id.link_login);

        // Remplir le spinner avec les rôles
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.roles_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerRole.setAdapter(adapter);

        btnRegister.setOnClickListener(v -> {
            String username = inputUsername.getText().toString().trim();
            String email = inputEmail.getText().toString().trim();
            String password = inputPassword.getText().toString().trim();
            String confirmPassword = inputConfirmPassword.getText().toString().trim();
            Role role = Role.valueOf(spinnerRole.getSelectedItem().toString().toUpperCase());

            if (validateInputs(username, email, password, confirmPassword)) {
                RegisterRequest request = new RegisterRequest(username, password, email, role, Statut.ACTIF);
                Call<String> call = RetrofitClient.getApiService().register(request);
                call.enqueue(new Callback<String>() {
                    @Override
                    public void onResponse(Call<String> call, Response<String> response) {
                        if (response.isSuccessful()) {
                            Toast.makeText(RegisterActivity.this, "Inscription réussie", Toast.LENGTH_SHORT).show();
                            finish(); // Retour à la connexion
                        } else {
                            Toast.makeText(RegisterActivity.this, "Échec de l'inscription", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<String> call, Throwable t) {
                        Toast.makeText(RegisterActivity.this, "Erreur réseau", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        linkLogin.setOnClickListener(v -> {
            finish(); // Retour à la connexion
        });
    }

    private boolean validateInputs(String username, String email, String password, String confirmPassword) {
        if (username.isEmpty()) {
            inputUsername.setError("Nom d'utilisateur requis");
            return false;
        }
        if (email.isEmpty()) {
            inputEmail.setError("Email requis");
            return false;
        }
        if (password.isEmpty()) {
            inputPassword.setError("Mot de passe requis");
            return false;
        }
        if (!password.equals(confirmPassword)) {
            inputConfirmPassword.setError("Les mots de passe ne correspondent pas");
            return false;
        }
        return true;
    }
}