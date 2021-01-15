import React from 'react';
import { useQuery } from 'react-query';
import {
  accessTokenFn,
  AuthAPI,
  refreshTokenFn,
  UserAPI,
} from '../libs/api/client';
import { useUserDispatch } from '../libs/context/UserContext';

interface CoreProps {}
const Core: React.FC<CoreProps> = () => {
  const userMountRef = React.useRef(false);
  const tokenMountRef = React.useRef(false);

  const dispatch = useUserDispatch();
  const user = useQuery('userData', () => UserAPI.user());
  const token = useQuery('tokenData', () => AuthAPI.tokens());

  React.useEffect(() => {
    if (user.data && !userMountRef.current) {
      userMountRef.current = true;
      dispatch({
        type: 'SET_USER',
        payload: user.data.user,
      });
    }

    if (!user.data) {
      userMountRef.current = false;
    }
  }, [user.data]);

  React.useEffect(() => {
    if (
      token.data &&
      token.data.accessToken &&
      token.data.refreshToken &&
      !tokenMountRef.current
    ) {
      tokenMountRef.current = true;
      accessTokenFn(token.data.accessToken);
      refreshTokenFn(token.data.refreshToken);
    }

    if (!token.data) {
      tokenMountRef.current = false;
    }
  }, [token.data]);

  return null;
};

export default Core;
