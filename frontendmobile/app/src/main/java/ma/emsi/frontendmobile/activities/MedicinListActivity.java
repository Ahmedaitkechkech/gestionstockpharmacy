package ma.emsi.frontendmobile.activities;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Arrays;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.adapters.MedicinAdapter;
import ma.emsi.frontendmobile.models.Medicin;

public class MedicinListActivity extends AppCompatActivity {
    private List<Medicin> medicinList = new ArrayList<>(Arrays.asList(
            new Medicin("Paracétamol", "Antalgiques", 10),
            new Medicin("Ibuprofène", "Anti-inflammatoires", 5)
    ));

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Utiliser MedicinAdapter au lieu de SimpleAdapter
        MedicinAdapter adapter = new MedicinAdapter(medicinList, medicin -> {
            // Optionnel : naviguer vers un écran de détail
            // Intent intent = new Intent(MedicinListActivity.this, MedicinDetailActivity.class);
            // intent.putExtra("medicin", medicin);
            // startActivity(intent);
        });

        recyclerView.setAdapter(adapter);
    }

    public void addMedicin(View view) {
        // Créer un nouveau médicament fictif
        Medicin newMedicin = new Medicin(
                "Médicament " + (medicinList.size() + 1),
                "Catégorie " + (medicinList.size() + 1),
                10
        );
        medicinList.add(newMedicin);
        ((MedicinAdapter) recyclerView.getAdapter()).notifyDataSetChanged();
    }
}