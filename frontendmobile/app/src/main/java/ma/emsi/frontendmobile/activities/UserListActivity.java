package ma.emsi.frontendmobile.activities;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.adapters.UserAdapter;
import ma.emsi.frontendmobile.models.Statut;
import ma.emsi.frontendmobile.models.User;
import ma.emsi.frontendmobile.models.Role;

public class UserListActivity extends AppCompatActivity {
    private List<User> userList = new ArrayList<>(Arrays.asList(
            new User(1, "Alice", "hash123", "alice@example.com", Role.RESPONSABLE, Statut.ACTIF),
            new User(2, "Bob", "hash456", "bob@example.com", Role.PHARMACIEN, Statut.ACTIF)
    ));

    private RecyclerView recyclerView; // ✅ Déclaration au niveau de la classe

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        recyclerView = findViewById(R.id.recyclerView); // ✅ Initialisation
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(new UserAdapter(userList, user -> {
            // Naviguer vers un écran de détail
        }));
    }

    public void addUser(View view) {
        User newUser = new User(
                "Utilisateur " + (userList.size() + 1),
                "password",
                "email" + (userList.size() + 1) + "@example.com",
                Role.PHARMACIEN
        );
        userList.add(newUser);
        ((UserAdapter) recyclerView.getAdapter()).notifyDataSetChanged();
    }
}