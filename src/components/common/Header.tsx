import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { AuthAPI, serverURL } from '../../libs/api/client';
import { userState } from '../../store/user';
import { UserIcon } from '../../styles/svg';

import Button from './Button';
import Responsive from './Responsive';

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  const { user } = useRecoilValue(userState);

  const onZoomLogin = React.useCallback(() => {
    window.location.href = `${serverURL}/auth/redirect/zoom`;
  }, []);

  const onLogout = React.useCallback(() => {
    AuthAPI.logout();
    localStorage.removeItem('@zoom::accessToken');
    localStorage.removeItem('@zoom::refreshToken');
    localStorage.removeItem('@zoom::user');
    window.location.href = '/';
  }, []);

  return (
    <>
      <div className="fixed bg-white shadow-md w-screen">
        <Responsive>
          <Wrapper>
            <Link to="/" className="logo">
              Zoom SDK
            </Link>
            {user ? (
              <div className="right space-x-2">
                <Link
                  to={`/@${user.id}`}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <UserIcon className="w-full h-full object-cover" />
                  </div>
                  <div className="mr-4 font-extrabold">
                    <span>{user.last_name}</span>
                    <span>{user.first_name}</span>
                  </div>
                </Link>
                <Button onClick={onLogout}>로그아웃</Button>
              </div>
            ) : (
              <div className="right">
                <Button onClick={onZoomLogin}>로그인</Button>
              </div>
            )}
          </Wrapper>
        </Responsive>
      </div>
      <div className="h-16" />
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;
