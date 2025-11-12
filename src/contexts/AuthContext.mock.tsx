import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Especialidades médicas disponibles
export type MedicalSpecialty =
    | 'general'
    | 'oftalmologia'
    | 'cardiologia'
    | 'pediatria'
    | 'dermatologia'
    | 'neurologia'
    | 'traumatologia'
    | 'ginecologia'
    | 'psiquiatria'
    | 'urologia';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    specialty: MedicalSpecialty;
    createdAt: Date;
    lastLogin: Date;
}

// Mock de FirebaseUser para mantener compatibilidad
interface MockFirebaseUser {
    uid: string;
    email: string | null;
    displayName: string | null;
}

interface AuthContextType {
    currentUser: MockFirebaseUser | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signup: (email: string, password: string, displayName: string, specialty: MedicalSpecialty) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    hasSpecialtyAccess: (specialty: MedicalSpecialty) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Funciones helper para localStorage
const STORAGE_KEYS = {
    USERS: 'mock_auth_users',
    CURRENT_USER: 'mock_auth_current_user'
};

interface StoredUser {
    uid: string;
    email: string;
    password: string; // En producción NUNCA almacenar contraseñas en plain text
    displayName: string;
    specialty: MedicalSpecialty;
    createdAt: string;
    lastLogin: string;
}

function getAllUsers(): StoredUser[] {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    return usersJson ? JSON.parse(usersJson) : [];
}

function saveAllUsers(users: StoredUser[]) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getCurrentUserSession(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
}

function setCurrentUserSession(uid: string) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, uid);
}

function clearCurrentUserSession() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<MockFirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Registro de nuevo usuario (MOCK)
    async function signup(email: string, password: string, displayName: string, specialty: MedicalSpecialty) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getAllUsers();

        // Verificar si el email ya existe
        if (users.find(u => u.email === email)) {
            throw new Error('auth/email-already-in-use');
        }

        // Crear nuevo usuario
        const newUser: StoredUser = {
            uid: `user_${Date.now()}`,
            email,
            password, // SOLO PARA MOCK - NUNCA hacer esto en producción
            displayName,
            specialty,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        users.push(newUser);
        saveAllUsers(users);

        // Establecer sesión
        setCurrentUserSession(newUser.uid);

        // Actualizar estado
        const mockUser: MockFirebaseUser = {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName
        };

        const profile: UserProfile = {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            specialty: newUser.specialty,
            createdAt: new Date(newUser.createdAt),
            lastLogin: new Date(newUser.lastLogin)
        };

        setCurrentUser(mockUser);
        setUserProfile(profile);
    }

    // Login (MOCK)
    async function login(email: string, password: string) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getAllUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            throw new Error('auth/user-not-found');
        }

        if (user.password !== password) {
            throw new Error('auth/wrong-password');
        }

        // Actualizar lastLogin
        user.lastLogin = new Date().toISOString();
        saveAllUsers(users);

        // Establecer sesión
        setCurrentUserSession(user.uid);

        // Actualizar estado
        const mockUser: MockFirebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        };

        const profile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            specialty: user.specialty,
            createdAt: new Date(user.createdAt),
            lastLogin: new Date(user.lastLogin)
        };

        setCurrentUser(mockUser);
        setUserProfile(profile);
    }

    // Logout (MOCK)
    async function logout() {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));

        clearCurrentUserSession();
        setCurrentUser(null);
        setUserProfile(null);
    }

    // Verificar acceso a especialidad
    function hasSpecialtyAccess(specialty: MedicalSpecialty): boolean {
        if (!userProfile) return false;
        // El usuario puede acceder a su propia especialidad o a 'general'
        return userProfile.specialty === specialty || specialty === 'general';
    }

    // Cargar sesión al iniciar
    useEffect(() => {
        const loadSession = () => {
            const currentUid = getCurrentUserSession();

            if (currentUid) {
                const users = getAllUsers();
                const user = users.find(u => u.uid === currentUid);

                if (user) {
                    const mockUser: MockFirebaseUser = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName
                    };

                    const profile: UserProfile = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        specialty: user.specialty,
                        createdAt: new Date(user.createdAt),
                        lastLogin: new Date(user.lastLogin)
                    };

                    setCurrentUser(mockUser);
                    setUserProfile(profile);
                } else {
                    // Usuario no encontrado, limpiar sesión
                    clearCurrentUserSession();
                }
            }

            setLoading(false);
        };

        loadSession();
    }, []);

    const value: AuthContextType = {
        currentUser,
        userProfile,
        loading,
        signup,
        login,
        logout,
        hasSpecialtyAccess
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
