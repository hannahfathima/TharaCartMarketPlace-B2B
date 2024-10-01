import { Link, Navigate } from 'react-router-dom';
import UseLoginedUser from '../redux/hooks/NavbarHook/UseLoginedUser';
import { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('authToken');
  const { loginedUser } = UseLoginedUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loginedUser) {
      setIsLoading(false);
    }
  }, [loginedUser]);
  if (!token || loginedUser?.length === 0) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return<>
    <Navbar/>
     <div className="pleaseLoginContainer">
       <div style={{width:"100%",height:"100vh",flexDirection:"column",display:"flex",justifyContent:"center",alignItems:"center"}}>Please Login <div><Link to='/login'><button>Login</button></Link></div></div>
    </div></>;
  }

  return element;
};

export default ProtectedRoute;

