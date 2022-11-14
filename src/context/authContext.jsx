import React, { useEffect, useState } from "react";
import { fakeAuthProvider } from "../auth.js";

let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = useState(undefined);
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  }, []);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      localStorage.setItem("user", newUser);

      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuth() {
  return React.useContext(AuthContext);
}
