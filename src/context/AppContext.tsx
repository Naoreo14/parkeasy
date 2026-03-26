'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'English' | 'French' | 'German' | 'Spanish' | 'Chinese' | 'Arabic' | 'Japanese' | 'Russian' | 'Portuguese';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (enabled: boolean) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  English: {
    'home': 'Home',
    'where_to': 'Where to?',
    'find_perfect_spot': 'FIND YOUR PERFECT SPOT',
    'search_placeholder': 'Enter destination address...',
    'radius': 'Search Radius',
    'preferences': 'Preferences',
    'show_results': 'Show Results',
    'map': 'Map',
    'search': 'Search',
    'activity': 'Activity',
    'profile': 'Profile',
    'navigate_here': 'Navigate Here',
    'start_navigation': 'Start Navigation',
    'end_session': 'End Session',
    'mark_free': 'Mark Spot as Free',
    'session_ended': 'Session Ended',
    'available': 'AVAILABLE',
    'busy': 'BUSY',
    'free': 'FREE',
    'paid': 'PAID',
    'type': 'TYPE',
    'price': 'PRICE',
    'distance': 'DISTANCE',
    'hours': 'HOURS',
    'turn_right': 'Turn right',
    'arrive': 'Arrive',
    'settings': 'App Settings',
    'notifications': 'Notifications',
    'dark_mode': 'Dark Appearance',
    'language': 'Language Settings',
    'sign_out': 'Sign Out',
    'active_session': 'Active Session',
    'time_remaining': 'TIME REMAINING',
    'extend_time': 'Extend Time',
    'payment_method': 'Payment Method',
    'session_summary': 'Session Summary',
    'total_due': 'Total Due',
    'service_charge': 'Service Charge',
    'digital_receipt': 'DIGITAL RECEIPT',
    'complete_payment': 'Complete Payment',
    'parking_made_effortless': 'Parking Made Effortless',
    'start_exploring': 'Start Exploring',
    'presentation_desc': 'Discover the smartest way to find and manage your parking in the city.',
  },
  French: {
    'home': 'Accueil',
    'where_to': 'Où aller ?',
    'find_perfect_spot': 'TROUVEZ VOTRE PLACE IDÉALE',
    'search_placeholder': 'Entrez l\'adresse de destination...',
    'radius': 'Rayon de recherche',
    'preferences': 'Préférences',
    'show_results': 'Afficher les résultats',
    'map': 'Carte',
    'search': 'Recherche',
    'activity': 'Activité',
    'profile': 'Profil',
    'navigate_here': 'Naviguer ici',
    'start_navigation': 'Démarrer la navigation',
    'end_session': 'Terminer la session',
    'mark_free': 'Libérer la place',
    'session_ended': 'Session terminée',
    'available': 'DISPONIBLE',
    'busy': 'OCCUPÉ',
    'free': 'GRATUIT',
    'paid': 'PAYANT',
    'type': 'TYPE',
    'price': 'PRIX',
    'distance': 'DISTANCE',
    'hours': 'HEURES',
    'turn_right': 'Tournez à droite',
    'arrive': 'Arriver',
    'settings': 'Paramètres',
    'notifications': 'Notifications',
    'dark_mode': 'Apparence sombre',
    'language': 'Langue',
    'sign_out': 'Déconnexion',
    'active_session': 'Session Active',
    'time_remaining': 'TEMPS RESTANT',
    'extend_time': 'Prolonger',
    'payment_method': 'Mode de Paiement',
    'session_summary': 'Résumé de la Session',
    'total_due': 'Total à Payer',
    'service_charge': 'Frais de Service',
    'digital_receipt': 'REÇU NUMÉRIQUE',
    'complete_payment': 'Finaliser le Paiement',
    'parking_made_effortless': 'Le Stationnement Sans Effort',
    'start_exploring': 'Commencer l\'Exploration',
    'presentation_desc': 'Découvrez la façon la plus intelligente de trouver et gérér votre stationnement en ville.',
  },
  Spanish: {
    'home': 'Inicio',
    'where_to': '¿A dónde vas?',
    'find_perfect_spot': 'ENCUENTRA TU LUGAR PERFECTO',
    'search_placeholder': 'Introduce la dirección...',
    'radius': 'Radio de búsqueda',
    'preferences': 'Preferencias',
    'show_results': 'Mostrar resultados',
    'map': 'Mapa',
    'search': 'Buscar',
    'activity': 'Actividad',
    'profile': 'Perfil',
    'navigate_here': 'Navegar aquí',
    'start_navigation': 'Iniciar navegación',
    'end_session': 'Finalizar sesión',
    'mark_free': 'Marcar como libre',
    'session_ended': 'Sesión terminada',
    'available': 'LIBRE',
    'busy': 'OCUPADO',
    'price': 'PRECIO',
    'distance': 'DISTANCIA',
    'hours': 'HORARIO',
    'turn_right': 'Gira a la derecha',
    'arrive': 'Llegar',
    'settings': 'Ajustes',
    'notifications': 'Notificaciones',
    'dark_mode': 'Modo oscuro',
    'language': 'Idioma',
    'sign_out': 'Cerrar sesión',
  },
  // Add other languages simplified for brevity
  German: { 'where_to': 'Wohin?' },
  Chinese: { 'where_to': '去哪里？' },
  Arabic: { 'where_to': 'إلى أين؟' },
  Japanese: { 'where_to': 'どこへ？' },
  Russian: { 'where_to': 'Куда едем?' },
  Portuguese: { 'where_to': 'Para onde?' },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const t = (key: string) => {
    return translations[language][key] || translations['English'][key] || key;
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      notificationsEnabled, setNotificationsEnabled,
      isDarkMode, setIsDarkMode,
      t 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
