import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  accessTokenFn,
  AuthAPI,
  refreshTokenFn,
  UserAPI,
  userFn,
} from '../libs/api/client';
import palette from '../libs/styles/palette';
import { userState } from '../store/user';

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const user = useQuery('userData', () => UserAPI.user());
  const token = useQuery('tokenData', () => AuthAPI.tokens());

  React.useEffect(() => {
    if (user.data) {
      setUser((oldUser) => ({ ...oldUser, user: user.data.user }));
      userFn(user.data.user);
    }

    if (token.data && token.data.accessToken && token.data.refreshToken) {
      accessTokenFn(token.data.accessToken);
      refreshTokenFn(token.data.refreshToken);
    }

    if (user.data && token.data) {
      setTimeout(() => {
        history.replace('/');
      }, 2000);
    }
  }, [user.data, token.data]);
  return (
    <LoginPageBlock className="h-screen">
      <div className="spinner">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </LoginPageBlock>
  );
};

export default LoginPage;

const LoginPageBlock = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette.gray1};

  .spinner {
    width: 100px;
    height: 100px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
    .sk-chase-dot {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      animation: sk-chase-dot 2s infinite ease-in-out both;
    }
    .sk-chase-dot:before {
      content: '';
      display: block;
      width: 25%;
      height: 25%;
      background-color: ${palette.teal6};
      border-radius: 100%;
      animation: sk-chase-dot-before 2s infinite ease-in-out both;
    }
    .sk-chase-dot:nth-child(1) {
      animation-delay: -1.1s;
    }
    .sk-chase-dot:nth-child(2) {
      animation-delay: -1s;
    }
    .sk-chase-dot:nth-child(3) {
      animation-delay: -0.9s;
    }
    .sk-chase-dot:nth-child(4) {
      animation-delay: -0.8s;
    }
    .sk-chase-dot:nth-child(5) {
      animation-delay: -0.7s;
    }
    .sk-chase-dot:nth-child(6) {
      animation-delay: -0.6s;
    }
    .sk-chase-dot:nth-child(1):before {
      animation-delay: -1.1s;
    }
    .sk-chase-dot:nth-child(2):before {
      animation-delay: -1s;
    }
    .sk-chase-dot:nth-child(3):before {
      animation-delay: -0.9s;
    }
    .sk-chase-dot:nth-child(4):before {
      animation-delay: -0.8s;
    }
    .sk-chase-dot:nth-child(5):before {
      animation-delay: -0.7s;
    }
    .sk-chase-dot:nth-child(6):before {
      animation-delay: -0.6s;
    }
    @keyframes sk-chase {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes sk-chase-dot {
      80%,
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes sk-chase-dot-before {
      50% {
        transform: scale(0.4);
      }
      100%,
      0% {
        transform: scale(1);
      }
    }
  }
`;
