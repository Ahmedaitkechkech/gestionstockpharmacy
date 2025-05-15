package ma.emsi.frontendmobile.activities;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.api.ApiService;
import ma.emsi.frontendmobile.api.RetrofitClient;
import ma.emsi.frontendmobile.models.Role;
import ma.emsi.frontendmobile.models.User;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

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

        // Remplir le spinner
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.roles_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        roleSpinner.setAdapter(adapter);

        findViewById(R.id.btn_save).setOnClickListener(v -> saveUser());
    }

    private void saveUser() {
        String username = usernameInput.getText().toString();
        String email = emailInput.getText().toString();
        String password = passwordInput.getText().toString();
        Role role = Role.valueOf(roleSpinner.getSelectedItem().toString().toUpperCase());

        User user = new User(username, password, email, role);

        // Appel API
        ApiService apiService = RetrofitClient.getApiService();
        Call<User> call = apiService.createUser(user);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    finish(); // Retour à la liste
                } else {
                    Toast.makeText(CreateUserActivity.this, "Échec de création", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Toast.makeText(CreateUserActivity.this, "Erreur réseau", Toast.LENGTH_SHORT).show();
            }
        });
    }
}