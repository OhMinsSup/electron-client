import React from 'react';
import { useQuery } from 'react-query';
import { useUserDispatch } from '../libs/context/UserContext';

interface CoreProps {}
const Core: React.FC<CoreProps> = () => {
  const dispatch = useUserDispatch();
  const { data } = useQuery('userData', () =>
    fetch('http://localhost:5000/api/user').then((res) => res.json()),
  );

  React.useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_USER',
        payload: {
          user: data.user,
          accessToken: data.accesToken,
          refreshToken: data.refreshToken,
        },
      });
    }
  }, [data]);

  console.log(data);
  return null;
};

export default Core;
