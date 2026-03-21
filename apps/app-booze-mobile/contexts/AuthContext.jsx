import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTHENTICATED_USER_KEY = 'authenticatedUser';

/** Valid MongoDB ObjectId for dev — backend aggregates require this format */
export const DEV_USER_ID = '507f1f77bcf86cd799439011';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const loadUser = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(AUTHENTICATED_USER_KEY);
      if (!raw || raw === '') {
        setUser(null);
        return;
      }
      const parsed = JSON.parse(raw);
      setUser(parsed);
    } catch {
      setUser(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const setAuthenticatedUser = useCallback(async (value) => {
    if (value == null || value === '') {
      await AsyncStorage.setItem(AUTHENTICATED_USER_KEY, '');
      setUser(null);
      return;
    }
    let next;
    if (typeof value === 'string') {
      try {
        next = JSON.parse(value);
      } catch {
        next = { userId: DEV_USER_ID };
      }
    } else {
      next = { ...value };
    }
    if (!next.userId) {
      next.userId = DEV_USER_ID;
    }
    const serialized = JSON.stringify(next);
    await AsyncStorage.setItem(AUTHENTICATED_USER_KEY, serialized);
    setUser(next);
  }, []);

  const clearAuthenticatedUser = useCallback(async () => {
    await AsyncStorage.setItem(AUTHENTICATED_USER_KEY, '');
    setUser(null);
  }, []);

  const userId = user?.userId ?? DEV_USER_ID;

  const value = useMemo(
    () => ({
      user,
      userId,
      isReady,
      setAuthenticatedUser,
      clearAuthenticatedUser,
      reloadUser: loadUser,
    }),
    [
      user,
      userId,
      isReady,
      setAuthenticatedUser,
      clearAuthenticatedUser,
      loadUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx == null) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
