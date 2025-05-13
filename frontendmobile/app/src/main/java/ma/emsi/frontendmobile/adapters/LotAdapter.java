package ma.emsi.frontendmobile.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.models.Lot;

public class LotAdapter extends RecyclerView.Adapter<LotAdapter.LotViewHolder> {
    private List<Lot> lotList;
    private OnItemClickListener listener;

    public interface OnItemClickListener {
        void onItemClick(Lot lot);
    }

    public LotAdapter(List<Lot> lotList, OnItemClickListener listener) {
        this.lotList = lotList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public LotViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Utiliser item_simple.xml au lieu de lot_item.xml
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_simple, parent, false);
        return new LotViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull LotViewHolder holder, int position) {
        Lot lot = lotList.get(position);

        // Fusionner toutes les données dans un seul TextView
        String displayText = "Numéro: " + lot.getNumeroLot() + "\n" +
                "Expiration: " + lot.getDateExpiration() + "\n" +
                "Quantité: " + lot.getQuantite();

        holder.textItem.setText(displayText);

        // Gérer le clic sur l'item
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onItemClick(lot);
            }
        });
    }

    @Override
    public int getItemCount() {
        return lotList.size();
    }

    static class LotViewHolder extends RecyclerView.ViewHolder {
        TextView textItem;

        public LotViewHolder(@NonNull View itemView) {
            super(itemView);
            // Utiliser l'ID défini dans item_simple.xml
            textItem = itemView.findViewById(R.id.text_item);
        }
    }
}