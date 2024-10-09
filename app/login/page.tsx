"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/components/language-provider';
import { useAuth } from '@/components/auth-provider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const { t } = useTranslation();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: t('loginSuccessful'),
        description: t('welcomeBack'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Invalid credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">{t('login')}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          {t('login')}
        </Button>
      </form>
      <div className="mt-4 space-y-2 text-center">
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
          {t('forgotPassword')}
        </Link>
        <p className="text-sm">
          {t('dontHaveAccount')}{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            {t('register')}
          </Link>
        </p>
      </div>
    </div>
  );
}