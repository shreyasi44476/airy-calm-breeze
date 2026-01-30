import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Always redirect to home - settings modal will handle first-time users
    navigate('/home');
  }, [navigate]);

  return null;
};

export default Index;
