"use client"

import React from 'react';
import { useTranslation } from './language-provider';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex space-x-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <Button
        variant={language === 'es' ? 'default' : 'outline'}
        onClick={() => setLanguage('es')}
      >
        ES
      </Button>
      <Button
        variant={language === 'fr' ? 'default' : 'outline'}
        onClick={() => setLanguage('fr')}
      >
        FR
      </Button>
    </div>
  );
};