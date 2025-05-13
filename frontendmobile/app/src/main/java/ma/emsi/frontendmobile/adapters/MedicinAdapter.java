package ma.emsi.frontendmobile.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.models.Medicin;

public class MedicinAdapter extends RecyclerView.Adapter<MedicinAdapter.MedicinViewHolder> {
    private List<Medicin> medicinList;
    private OnItemClickListener listener;

    public interface OnItemClickListener {
        void onItemClick(Medicin medicin);
    }

    public MedicinAdapter(List<Medicin> medicinList, OnItemClickListener listener) {
        this.medicinList = medicinList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public MedicinViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Utiliser item_simple.xml au lieu de medicin_item.xml
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_simple, parent, false);
        return new MedicinViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MedicinViewHolder holder, int position) {
        Medicin medicin = medicinList.get(position);

        // Fusionner toutes les données dans un seul TextView
        String displayText = "Nom: " + medicin.getName() + "\n" +
                "Catégorie: " + medicin.getCategorie() + "\n" +
                "Seuil d'alerte: " + medicin.getSeuilAlerte();

        holder.textItem.setText(displayText);

        // Gérer le clic sur l'item
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onItemClick(medicin);
            }
        });
    }

    @Override
    public int getItemCount() {
        return medicinList.size();
    }

    static class MedicinViewHolder extends RecyclerView.ViewHolder {
        TextView textItem;

        public MedicinViewHolder(@NonNull View itemView) {
            super(itemView);
            // Utiliser l'ID défini dans item_simple.xml
            textItem = itemView.findViewById(R.id.text_item);
        }
    }
}