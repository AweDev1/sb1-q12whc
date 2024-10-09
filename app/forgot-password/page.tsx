"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/components/language-provider';
import { useAuth } from '@/components/auth-provider';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast({
        title: t('resetLinkSent'),
        description: t('checkEmailForInstructions'),
      });
      router.push('/login');
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Failed to send reset link',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">{t('forgotPassword')}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          {t('sendResetLink')}
        </Button>
      </form>
    </div>
  );
}