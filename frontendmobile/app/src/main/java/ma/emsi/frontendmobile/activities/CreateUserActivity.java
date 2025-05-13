package ma.emsi.frontendmobile.activities;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.api.ApiService;
import ma.emsi.frontendmobile.api.ErrorUtils;
import ma.emsi.frontendmobile.api.RetrofitClient;
import ma.emsi.frontendmobile.models.Role;
import ma.emsi.frontendmobile.models.User;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CreateUserActivity extends AppCompatActivity {
    private EditText usernameInput, emailInput, passwordInput;
    private Spinner roleSpinner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_user);

        usernameInput = findViewById(R.id.input_username);
        emailInput = findViewById(R.id.input_email);
        passwordInput = findViewById(R.id.input_password);
        roleSpinner = findViewById(R.id.spinner_role);

        // Remplir le spinner avec les rôles
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.roles_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        roleSpinner.setAdapter(adapter);

        findViewById(R.id.btn_save).setOnClickListener(v -> {
            if (validateInputs()) {
                saveUser();
            }
        });
    }

    // Valide les champs du formulaire
    private boolean validateInputs() {
        if (usernameInput.getText().toString().trim().isEmpty()) {
            usernameInput.setError("Nom d'utilisateur requis");
            return false;
        }
        if (emailInput.getText().toString().trim().isEmpty()) {
            emailInput.setError("Email requis");
            return false;
        }
        if (passwordInput.getText().toString().trim().isEmpty()) {
            passwordInput.setError("Mot de passe requis");
            return false;
        }
        return true;
    }

    private void saveUser() {
        String username = usernameInput.getText().toString().trim();
        String email = emailInput.getText().toString().trim();
        String password = passwordInput.getText().toString().trim();
        Role role = Role.valueOf(roleSpinner.getSelectedItem().toString().toUpperCase()); // Assurez-vous que les noms correspondent

        User user = new User(username, password, email, role);

        // Appel API pour créer l'utilisateur
        ApiService apiService = RetrofitClient.getApiService("token_jwt");
        Call<User> call = apiService.createUser(user);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(CreateUserActivity.this, "Utilisateur créé", Toast.LENGTH_SHORT).show();
                    finish(); // Retour à la liste
                } else {
                    Toast.makeText(CreateUserActivity.this,
                            ErrorUtils.parseError(response), Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Toast.makeText(CreateUserActivity.this,
                        "Erreur réseau : " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}