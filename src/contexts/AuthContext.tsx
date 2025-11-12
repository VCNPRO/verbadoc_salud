import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

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

interface AuthContextType {
    currentUser: FirebaseUser | null;
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

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Registro de nuevo usuario
    async function signup(email: string, password: string, displayName: string, specialty: MedicalSpecialty) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Actualizar perfil con nombre
        await updateProfile(user, { displayName });

        // Crear documento de perfil en Firestore
        const profile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            displayName,
            specialty,
            createdAt: new Date(),
            lastLogin: new Date()
        };

        await setDoc(doc(db, 'users', user.uid), profile);
        setUserProfile(profile);
    }

    // Login
    async function login(email: string, password: string) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Actualizar lastLogin en Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { lastLogin: new Date() }, { merge: true });

        // Cargar perfil
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
        }
    }

    // Logout
    async function logout() {
        setUserProfile(null);
        await signOut(auth);
    }

    // Verificar acceso a especialidad
    function hasSpecialtyAccess(specialty: MedicalSpecialty): boolean {
        if (!userProfile) return false;
        // El usuario puede acceder a su propia especialidad o a 'general'
        return userProfile.specialty === specialty || specialty === 'general';
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                // Cargar perfil del usuario desde Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserProfile(userDoc.data() as UserProfile);
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
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
