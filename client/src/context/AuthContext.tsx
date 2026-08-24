import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getCurrentAdmin, logoutAdmin, type Admin } from "../services/api";

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const currentAdmin = await getCurrentAdmin();
      setAdmin(currentAdmin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } finally {
      setAdmin(null);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const checkAuthentication = async () => {
      try {
        const currentAdmin = await getCurrentAdmin();

        if (!cancelled) {
          setAdmin(currentAdmin);
        }
      } catch {
        if (!cancelled) {
          setAdmin(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: admin !== null,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};
