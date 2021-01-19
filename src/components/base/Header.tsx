import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AuthAPI } from '../../libs/api/client';
import { userState } from '../../store/user';
import { UserIcon } from '../../styles/svg';
import Button from '../common/Button';

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  const state = useRecoilValue(userState);

  const onZoomLogin = React.useCallback(() => {
    window.location.href = 'http://localhost:5000/api/auth/redirect/zoom';
  }, []);

  const onLogout = React.useCallback(() => {
    AuthAPI.logout();
    localStorage.removeItem('@zoom::accessToken');
    localStorage.removeItem('@zoom::refreshToken');
    localStorage.removeItem('@zoom::user');
    window.location.href = '/';
  }, []);

  return (
    <header className="container max-w-full inset-0 flex items-center justify-between px-6 h-20 border-b border-gray-400 fixed bg-white">
      <div className="flex items-center w-1/2">
        <Link to="/" className="mr-6">
          <strong className="capitalize ml-1 flex-1">Zoom SDK</strong>
        </Link>
      </div>
      <ul className="flex items-center text-sm font-medium h-full">
        {state.user ? (
          <>
            <li className="ml-6 border-b-2 border-white h-full flex items-center cursor-pointer">
              <Link
                to={`/@${state.user?.id}`}
                className="w-8 h-8 overflow-hidden rounded-full"
              >
                <UserIcon className="w-full h-full object-cover" />
              </Link>
            </li>
            <li className="ml-6 border-b-2 border-white h-full flex items-center">
              <Button onClick={onLogout}>로그아웃</Button>
            </li>
          </>
        ) : (
          <li className="ml-6 border-b-2 border-white h-full flex items-center">
            <Button onClick={onZoomLogin}>로그인</Button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
