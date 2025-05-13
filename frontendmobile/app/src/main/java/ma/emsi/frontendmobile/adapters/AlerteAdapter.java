package ma.emsi.frontendmobile.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.models.Alerte;

public class AlerteAdapter extends RecyclerView.Adapter<AlerteAdapter.AlerteViewHolder> {
    private List<Alerte> alerteList;
    private OnItemClickListener listener;

    public interface OnItemClickListener {
        void onItemClick(Alerte alerte);
    }

    public AlerteAdapter(List<Alerte> alerteList, OnItemClickListener listener) {
        this.alerteList = alerteList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public AlerteViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Utiliser item_simple.xml au lieu de alerte_item.xml
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_simple, parent, false);
        return new AlerteViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AlerteViewHolder holder, int position) {
        Alerte alerte = alerteList.get(position);

        // Fusionner toutes les données dans un seul TextView
        String displayText = "Type: " + alerte.getType() + "\n" +
                "Message: " + alerte.getMessage() + "\n" +
                "Date: " + alerte.getDateAlerte() + "\n" +
                "Statut: " + (alerte.isEstResolue() ? "Résolue" : "Non résolue");

        holder.textItem.setText(displayText);

        // Gérer le clic sur l'item
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onItemClick(alerte);
            }
        });
    }

    @Override
    public int getItemCount() {
        return alerteList.size();
    }

    static class AlerteViewHolder extends RecyclerView.ViewHolder {
        TextView textItem;

        public AlerteViewHolder(@NonNull View itemView) {
            super(itemView);
            // Utiliser l'ID défini dans item_simple.xml
            textItem = itemView.findViewById(R.id.text_item);
        }
    }
}