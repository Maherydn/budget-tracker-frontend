"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Rediriger après 3 secondes
    router.push('/login');
    // setTimeout(() => {
    // }, 3000);
  }, 
  [router]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>La page que vous cherchez n'existe pas. Vous allez être redirigé vers la page de connexion...</p>
    </div>
  );
};

export default NotFound;
