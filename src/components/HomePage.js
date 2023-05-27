// components/HomePage.js
import { useContext, useEffect, useState } from 'react';
import { getHomepageMessage } from '../services/api';
import { AuthContext } from '../services/auth';

const HomePage = () => {
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHomepageMessage = async () => {
      try {
        const message = await getHomepageMessage();
        setMessage(message);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchHomepageMessage();
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <h2>Hello! Welcome to the homepage, {user.fullname}.</h2>
      ) : (
        <h2>Please log in to see the homepage.</h2>
      )}
      <p>{message}</p>
    </div>
  );
};

export default HomePage;
