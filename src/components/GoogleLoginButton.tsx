import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import {useUserStore} from "../stores/user.ts";
import {toast} from "react-hot-toast";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const GoogleLoginButton = () => {
  const userStore = useUserStore();
  const { user, setUser } = userStore;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {!user ? (
        <GoogleLogin
          onSuccess={(response) => {
            toast.success('Google OAuth success!');
            setUser(response.credential!);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      ) : (
        <button
          onClick={() => {
            googleLogout();
            setUser(null);
          }}
        >
          Logout
        </button>
      )}
    </GoogleOAuthProvider>
  );
};
