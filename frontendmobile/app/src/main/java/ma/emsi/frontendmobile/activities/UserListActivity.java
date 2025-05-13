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
import ma.emsi.frontendmobile.models.User;
import ma.emsi.frontendmobile.models.Role;

public class UserListActivity extends AppCompatActivity {
    private List<User> userList = new ArrayList<>(Arrays.asList(
            new User(1, "Alice", "alice@example.com", Role.SRESPONSABLEORTIE),
            new User(2, "Bob", "bob@example.com", Role.PHARMACIEN)
    ));

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Utiliser UserAdapter au lieu de SimpleAdapter
        UserAdapter adapter = new UserAdapter(userList, user -> {
            // Naviguer vers un écran de détail (optionnel)
            // Intent intent = new Intent(UserListActivity.this, UserDetailActivity.class);
            // intent.putExtra("user", user);
            // startActivity(intent);
        });

        recyclerView.setAdapter(adapter);
    }

    public void addUser(View view) {
        // Créer un nouvel utilisateur fictif
        User newUser = new User(
                userList.size() + 1,
                "Utilisateur " + (userList.size() + 1),
                "email" + (userList.size() + 1) + "@example.com",
                Role.PHARMACIEN
        );
        userList.add(newUser);
        ((UserAdapter) recyclerView.getAdapter()).notifyDataSetChanged();
    }
}