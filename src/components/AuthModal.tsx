import React, { useState } from 'react';
import { useAuth, MedicalSpecialty } from '../contexts/AuthContext';

interface AuthModalProps {
    isHealthMode: boolean;
}

const SPECIALTIES: { value: MedicalSpecialty; label: string }[] = [
    { value: 'general', label: 'Medicina General' },
    { value: 'oftalmologia', label: 'Oftalmología' },
    { value: 'cardiologia', label: 'Cardiología' },
    { value: 'pediatria', label: 'Pediatría' },
    { value: 'dermatologia', label: 'Dermatología' },
    { value: 'neurologia', label: 'Neurología' },
    { value: 'traumatologia', label: 'Traumatología' },
    { value: 'ginecologia', label: 'Ginecología' },
    { value: 'psiquiatria', label: 'Psiquiatría' },
    { value: 'urologia', label: 'Urología' }
];

export function AuthModal({ isHealthMode }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [specialty, setSpecialty] = useState<MedicalSpecialty>('general');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, login } = useAuth();

    const backgroundColor = isHealthMode ? '#ffffff' : '#1e293b';
    const textColor = isHealthMode ? '#1f2937' : '#f1f5f9';
    const borderColor = isHealthMode ? '#d1d5db' : '#475569';
    const accentColor = isHealthMode ? '#00897b' : '#3b82f6';
    const inputBg = isHealthMode ? '#f9fafb' : '#0f172a';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                if (!displayName.trim()) {
                    throw new Error('Por favor ingresa tu nombre');
                }
                await signup(email, password, displayName, specialty);
            }
        } catch (err: any) {
            console.error('Error de autenticación:', err);

            // Mensajes de error en español
            const errorMessages: { [key: string]: string } = {
                'auth/email-already-in-use': 'Este email ya está registrado',
                'auth/invalid-email': 'Email inválido',
                'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
                'auth/user-not-found': 'Usuario no encontrado',
                'auth/wrong-password': 'Contraseña incorrecta',
                'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
                'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
            };

            setError(errorMessages[err.code] || err.message || 'Error al autenticar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: inputBg }}>
            <div
                className="w-full max-w-md p-8 rounded-2xl shadow-2xl border-2"
                style={{ backgroundColor, borderColor }}
            >
                {/* Logo y título */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: accentColor }}
                    >
                        VerbaDoc Salud
                    </h1>
                    <p className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
                        Sistema de Gestión Documental Médica
                    </p>
                </div>

                {/* Tabs Login/Registro */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => {
                            setIsLogin(true);
                            setError('');
                        }}
                        className="flex-1 py-2 px-4 rounded-lg font-medium transition-all"
                        style={{
                            backgroundColor: isLogin ? accentColor : 'transparent',
                            color: isLogin ? '#ffffff' : textColor,
                            border: `2px solid ${isLogin ? accentColor : borderColor}`
                        }}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={() => {
                            setIsLogin(false);
                            setError('');
                        }}
                        className="flex-1 py-2 px-4 rounded-lg font-medium transition-all"
                        style={{
                            backgroundColor: !isLogin ? accentColor : 'transparent',
                            color: !isLogin ? '#ffffff' : textColor,
                            border: `2px solid ${!isLogin ? accentColor : borderColor}`
                        }}
                    >
                        Registro
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                style={{ color: textColor }}
                            >
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required={!isLogin}
                                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: inputBg,
                                    borderColor,
                                    color: textColor
                                }}
                                placeholder="Dr. Juan Pérez"
                            />
                        </div>
                    )}

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: textColor }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: inputBg,
                                borderColor,
                                color: textColor
                            }}
                            placeholder="medico@ejemplo.com"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: textColor }}
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: inputBg,
                                borderColor,
                                color: textColor
                            }}
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                style={{ color: textColor }}
                            >
                                Especialidad Médica
                            </label>
                            <select
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value as MedicalSpecialty)}
                                required
                                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: inputBg,
                                    borderColor,
                                    color: textColor
                                }}
                            >
                                {SPECIALTIES.map(spec => (
                                    <option key={spec.value} value={spec.value}>
                                        {spec.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {error && (
                        <div
                            className="p-3 rounded-lg text-sm"
                            style={{
                                backgroundColor: '#fee2e2',
                                color: '#991b1b',
                                border: '1px solid #fca5a5'
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: accentColor }}
                    >
                        {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
                    </button>
                </form>

                {/* Pie del formulario */}
                <div className="mt-6 text-center text-sm" style={{ color: textColor, opacity: 0.7 }}>
                    {isLogin ? (
                        <p>
                            ¿No tienes cuenta?{' '}
                            <button
                                onClick={() => {
                                    setIsLogin(false);
                                    setError('');
                                }}
                                className="font-medium hover:underline"
                                style={{ color: accentColor }}
                            >
                                Regístrate aquí
                            </button>
                        </p>
                    ) : (
                        <p>
                            ¿Ya tienes cuenta?{' '}
                            <button
                                onClick={() => {
                                    setIsLogin(true);
                                    setError('');
                                }}
                                className="font-medium hover:underline"
                                style={{ color: accentColor }}
                            >
                                Inicia sesión
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
