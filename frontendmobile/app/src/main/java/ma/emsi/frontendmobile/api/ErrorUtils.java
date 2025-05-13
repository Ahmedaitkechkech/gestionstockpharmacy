package ma.emsi.frontendmobile.api;

import org.json.JSONObject;

import okhttp3.ResponseBody;
import retrofit2.Response;

public class ErrorUtils {
    public static String parseError(Response<?> response) {
        try {
            ResponseBody errorBody = response.errorBody();
            if (errorBody != null) {
                JSONObject json = new JSONObject(errorBody.string());
                return json.optString("message", "Erreur inconnue");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Erreur réseau";
    }
}