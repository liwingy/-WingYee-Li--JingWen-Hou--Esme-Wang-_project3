import { useNavigate } from 'react-router-dom';

export const useRedirectLogin = () => {
  const navigate = useNavigate();
  return () => navigate('/login');
};