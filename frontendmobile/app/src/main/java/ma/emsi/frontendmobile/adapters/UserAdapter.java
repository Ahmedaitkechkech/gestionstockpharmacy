package ma.emsi.frontendmobile.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import ma.emsi.frontendmobile.R;
import ma.emsi.frontendmobile.models.User;

public class UserAdapter extends RecyclerView.Adapter<UserAdapter.UserViewHolder> {
    private List<User> userList;
    private OnItemClickListener listener;

    public interface OnItemClickListener {
        void onItemClick(User user);
    }

    public UserAdapter(List<User> userList, OnItemClickListener listener) {
        this.userList = userList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public UserViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Utiliser item_simple.xml au lieu de user_item.xml
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_simple, parent, false);
        return new UserViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull UserViewHolder holder, int position) {
        User user = userList.get(position);

        // Fusionner toutes les données dans un seul TextView
        String displayText = "Nom d'utilisateur: " + user.getUsername() + "\n" +
                "Email: " + user.getEmail() + "\n" +
                "Rôle: " + user.getRole();

        holder.textItem.setText(displayText);

        // Gérer le clic sur l'item
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onItemClick(user);
            }
        });
    }

    @Override
    public int getItemCount() {
        return userList.size();
    }

    static class UserViewHolder extends RecyclerView.ViewHolder {
        TextView textItem;

        public UserViewHolder(@NonNull View itemView) {
            super(itemView);
            // Utiliser l'ID défini dans item_simple.xml
            textItem = itemView.findViewById(R.id.text_item);
        }
    }
}