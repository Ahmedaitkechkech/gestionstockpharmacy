package ma.emsi.frontendmobile.activities;

import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.adapters.MedicinAdapter;
import ma.emsi.frontendmobile.models.Medicin;

public class MedicinListActivity extends AppCompatActivity {
    private List<Medicin> medicinList = new ArrayList<>(Arrays.asList(
            new Medicin("Paracétamol", "Antalgiques", 10),
            new Medicin("Ibuprofène", "Anti-inflammatoires", 5)
    ));

    // ✅ Déclaration de recyclerView au niveau de la classe
    private RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        // ✅ Initialisation de recyclerView
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // ✅ Création de l'adapter
        MedicinAdapter adapter = new MedicinAdapter(medicinList, medicin -> {
            Toast.makeText(MedicinListActivity.this, "Clique sur médicament", Toast.LENGTH_SHORT).show();
        });

        recyclerView.setAdapter(adapter);
    }

    public void addMedicin(View view) {
        // ✅ Ajout d'un nouveau médicament
        Medicin newMedicin = new Medicin(
                "Médicament " + (medicinList.size() + 1),
                "Catégorie",
                10
        );
        medicinList.add(newMedicin);
        ((MedicinAdapter) recyclerView.getAdapter()).notifyDataSetChanged();
    }
}