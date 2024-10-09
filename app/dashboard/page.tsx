"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/components/language-provider';
import { LanguageSwitcher }from '@/components/language-switcher';
import { useAuth } from '@/components/auth-provider';

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: t('logoutSuccessful'),
      description: t('comeBackSoon'),
    });
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">{t('dashboard')}</h1>
      <p className="mb-4">{t('welcomeToDashboard')}</p>
      <p className="mb-4">Email: {user.email}</p>
      <p className="mb-4">Role: {user.role}</p>
      <LanguageSwitcher />
      <Button onClick={handleLogout} className="mt-4">
        {t('logout')}
      </Button>
    </div>
  );
}