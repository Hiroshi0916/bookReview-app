import React, { createContext, useState } from "react";
import { User } from "./User";


export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  avatarUrl: string | null; 
  setAvatarUrl: React.Dispatch<React.SetStateAction<string | null>>; 
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  updateUsername: (newName: string) => void; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);


        // Define the updateUser function
        const updateUser = (updatedUser: Partial<User>) => {
          setUser((prevUser) => {
            if(prevUser){
              return { ...prevUser, ...updatedUser };
            }else{
              return null;
            }
          });
      };

      const updateUsername = (newName: string) => {
        updateUser({ name: newName });
        // setUser((prevUser) => prevUser ? { ...prevUser, name: newName } : null);
      };
  
    const logout = () => {
        // ここでログアウト処理を行います。
        // 例: 認証情報をクリア、ローカルストレージをクリアなど
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        // 必要に応じて他のクリア処理を追加
      };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, avatarUrl, setAvatarUrl, logout,updateUser,updateUsername }}> 
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
