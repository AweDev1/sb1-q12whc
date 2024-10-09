"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr';

type Translations = {
  [key: string]: string;
};

const translations: Record<Language, Translations> = {
  en: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    sendResetLink: 'Send Reset Link',
    logout: 'Logout',
    dashboard: 'Dashboard',
    welcomeToDashboard: 'Welcome to your dashboard!',
    error: 'Error',
    passwordsDontMatch: 'Passwords do not match',
    loginSuccessful: 'Login Successful',
    welcomeBack: 'Welcome back!',
    registrationSuccessful: 'Registration Successful',
    accountCreated: 'Your account has been created',
    resetLinkSent: 'Reset Link Sent',
    checkEmailForInstructions: 'Please check your email for further instructions',
    passwordResetSuccessful: 'Password Reset Successful',
    loginWithNewPassword: 'You can now login with your new password',
    logoutSuccessful: 'Logout Successful',
    comeBackSoon: 'Come back soon!',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
  },
  es: {
    login: 'Iniciar sesión',
    register: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    resetPassword: 'Restablecer contraseña',
    newPassword: 'Nueva contraseña',
    confirmNewPassword: 'Confirmar nueva contraseña',
    sendResetLink: 'Enviar enlace de restablecimiento',
    logout: 'Cerrar sesión',
    dashboard: 'Panel de control',
    welcomeToDashboard: '¡Bienvenido a tu panel de control!',
    error: 'Error',
    passwordsDontMatch: 'Las contraseñas no coinciden',
    loginSuccessful: 'Inicio de sesión exitoso',
    welcomeBack: '¡Bienvenido de vuelta!',
    registrationSuccessful: 'Registro exitoso',
    accountCreated: 'Tu cuenta ha sido creada',
    resetLinkSent: 'Enlace de restablecimiento enviado',
    checkEmailForInstructions: 'Por favor, revisa tu correo electrónico para más instrucciones',
    passwordResetSuccessful: 'Restablecimiento de contraseña exitoso',
    loginWithNewPassword: 'Ahora puedes iniciar sesión con tu nueva contraseña',
    logoutSuccessful: 'Cierre de sesión exitoso',
    comeBackSoon: '¡Vuelve pronto!',
    dontHaveAccount: "¿No tienes una cuenta?",
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
  },
  fr: {
    login: 'Connexion',
    register: "S'inscrire",
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    resetPassword: 'Réinitialiser le mot de passe',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
    sendResetLink: 'Envoyer le lien de réinitialisation',
    logout: 'Déconnexion',
    dashboard: 'Tableau de bord',
    welcomeToDashboard: 'Bienvenue sur votre tableau de bord !',
    error: 'Erreur',
    passwordsDontMatch: 'Les mots de passe ne correspondent pas',
    loginSuccessful: 'Connexion réussie',
    welcomeBack: 'Bon retour !',
    registrationSuccessful: 'Inscription réussie',
    accountCreated: 'Votre compte a été créé',
    resetLinkSent: 'Lien de réinitialisation envoyé',
    checkEmailForInstructions: 'Veuillez vérifier votre email pour plus d\'instructions',
    passwordResetSuccessful: 'Réinitialisation du mot de passe réussie',
    loginWithNewPassword: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe',
    logoutSuccessful: 'Déconnexion réussie',
    comeBackSoon: 'À bientôt !',
    dontHaveAccount: "Vous n'avez pas de compte ?",
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    },
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};