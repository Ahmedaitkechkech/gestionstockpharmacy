package ma.emsi.frontendmobile.activities;

import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.adapters.AlerteAdapter;
import ma.emsi.frontendmobile.models.Alerte;

public class AlerteListActivity extends AppCompatActivity {
    private List<Alerte> alerteList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(new AlerteAdapter(alerteList, alerte -> {
            Toast.makeText(this, "Alerte cliquée", Toast.LENGTH_SHORT).show();
        }));
    }
}