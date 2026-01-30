import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Onboarding from './Onboarding';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return <Onboarding />;
};

export default Index;
