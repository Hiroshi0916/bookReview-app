import React, { ReactNode, createContext, useEffect, useState } from "react";

import { User } from "./interfaces/User";
import { AuthContextType } from "./interfaces/AuthContextType";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

// export const AuthContext = createContext();

export function AuthProvider({ children }: Props) {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) as User :null;
  const [user, setUser] = useState<User | null>(initialUser);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    localStorage.getItem("avatarUrl")
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prevUser) => {
      if (prevUser === null) return prevUser;
      return { ...prevUser, ...updatedUser };
    });
  };

    // ユーザー情報が更新されたらローカルストレージに保存
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }, [user]);

  const updateUsername = (newName: string) => {
    updateUser({ name: newName });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("user"); // ユーザー情報も削除
    setAvatarUrl(null); 
  };

  useEffect(() => {
    // アバターURLがlocalStorageに存在する場合に設定
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }
  }, []);


  useEffect(() => {
    if (avatarUrl) {
      localStorage.setItem("avatarUrl", avatarUrl);
    } else {
      localStorage.removeItem("avatarUrl");
    }
  }, [avatarUrl]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        avatarUrl,
         setAvatarUrl, 
         logout,
         updateUser,
         updateUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
