"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/components/language-provider';
import { useAuth } from '@/components/auth-provider';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { resetPassword } = useAuth();

  const token = searchParams.get('token');

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
    if (!token) {
      toast({
        title: t('error'),
        description: 'Invalid reset token',
        variant: 'destructive',
      });
      return;
    }
    try {
      await resetPassword(token, password);
      toast({
        title: t('passwordResetSuccessful'),
        description: t('loginWithNewPassword'),
      });
      router.push('/login');
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Failed to reset password',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">{t('resetPassword')}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          type="password"
          placeholder={t('newPassword')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={t('confirmNewPassword')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          {t('resetPassword')}
        </Button>
      </form>
    </div>
  );
}