import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType: "customer" | "photographer" | "admin";
  photographerId?: string;
  location?: string;
  bio?: string;
  phone?: string;
  specialties?: string[];
  equipment?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kiểm tra localStorage khi component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check for admin login
      if (email === 'admin@snapmatch.ai' && password === 'admin123') {
        const adminData: User = {
          id: 'admin',
          name: 'Admin User',
          email: email,
          avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'admin',
        };

        setUser(adminData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(adminData));
        return true;
      }
      
      // Check if it's a photographer email (for demo purposes)
      const isPhotographer =
        email.includes("photographer") ||
        email === "lily@photographer.com" ||
        email === "michael@photographer.com";

      const userData: User = {
        id: isPhotographer ? "1" : "2",
        name: isPhotographer
          ? "Lily Emily"
          : email === "admin@example.com"
            ? "Admin User"
            : "Customer User",
        email: email,
        avatar:
          "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        userType: isPhotographer ? "photographer" : "customer",
        photographerId: isPhotographer ? "1" : undefined,
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Lưu vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.fullName,
        email: userData.email,
        avatar:
          "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        userType: userData.userType || "customer",
        photographerId: userData.userType === "photographer" ? "1" : undefined,
      };

      setUser(newUser);
      setIsAuthenticated(true);

      // Lưu vào localStorage
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    signup,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
