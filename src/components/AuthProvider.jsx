import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, fetchSession } from "../redux/reducers/authSlice";
import { supabase } from "../asset/client";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        dispatch(fetchSession(session));
      } else {
        dispatch(clearUser());
      }
    };

    restoreSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          dispatch(fetchSession(session));
        } else {
          dispatch(clearUser());
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return children;
};

export default AuthProvider;
