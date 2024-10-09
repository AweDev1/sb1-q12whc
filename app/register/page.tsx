"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/components/language-provider';
import { useAuth } from '@/components/auth-provider';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const { t } = useTranslation();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: t('error'),
        description: t('passwordsDontMatch'),
        variant: 'destructive',
      });
      return;
    }
    try {
      await register(email, password);
      toast({
        title: t('registrationSuccessful'),
        description: t('accountCreated'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Registration failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">{t('register')}</h1>
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
        <Input
          type="password"
          placeholder={t('confirmPassword')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          {t('register')}
        </Button>
      </form>
      <p className="mt-4 text-sm">
        {t('alreadyHaveAccount')}{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          {t('login')}
        </Link>
      </p>
    </div>
  );
}