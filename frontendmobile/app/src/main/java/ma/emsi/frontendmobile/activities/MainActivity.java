package ma.emsi.frontendmobile.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import ma.emsi.frontendmobile.R;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    public void openUserList(View view) {
        startActivity(new Intent(this, UserListActivity.class));
    }

    public void openMedicinList(View view) {
        startActivity(new Intent(this, MedicinListActivity.class));
    }

    public void openAlerteList(View view) {
        startActivity(new Intent(this, AlerteListActivity.class));
    }
}