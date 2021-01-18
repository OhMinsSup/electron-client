import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { AuthAPI } from '../../libs/api/client';
// import { userState } from '../../store/user';
// import { UserIcon } from '../../styles/svg';
import Button from '../common/Button';

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  const history = useHistory();
  // const state = useRecoilValue(userState);

  const onClick = React.useCallback(() => {
    history.push('/connect');
  }, []);

  // const onLogout = React.useCallback(() => {
  //   AuthAPI.logout();
  //   localStorage.removeItem('@zoom::accessToken');
  //   localStorage.removeItem('@zoom::refreshToken');
  //   localStorage.removeItem('@zoom::user');
  //   window.location.href = '/';
  // }, []);
  console.log('test');
  return (
    <header className="container max-w-full inset-0 flex items-center justify-between px-6 h-20 border-b border-gray-400 fixed bg-white">
      <div className="flex items-center w-1/3">
        <Link to="/" className="mr-6">
          <strong className="capitalize ml-1 flex-1">Zoom SDK</strong>
        </Link>
      </div>
      <ul className="flex items-center text-sm font-medium h-full">
        <li className="ml-6 border-b-2 border-white h-full flex items-center">
          <Button onClick={onClick}>로그인</Button>
        </li>
        <li className="ml-6 border-b-2 border-white h-full flex items-center">
          <Button onClick={onClick}>접속하기</Button>
        </li>
      </ul>
      {/* <div className="flex-none w-56 flex flex-row items-center">
        <Link to="/">
          <strong className="capitalize ml-1 flex-1">Zoom SDK</strong>
        </Link>

        <button
          type="button"
          className="flex-none text-right text-gray-900 hidden"
        >
          <i className="fad fa-list-ul"></i>
        </button>
      </div> */}
      {/* <div className="flex-1 pl-3 flex flex-wrap justify-between items-center flex-row-reverse">
        <div className="flex items-center">
          <div className="flex flex-row relative space-x-5">
            {state.user && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    history.push(`/@${state.user?.id}`);
                  }}
                  className="focus:outline-none focus:shadow-outline flex flex-wrap items-center"
                >
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <UserIcon className="w-full h-full object-cover" />
                  </div>

                  <div className="ml-2 capitalize flex ">
                    <h1 className="text-sm text-gray-800 font-semibold m-0 p-0 leading-none">
                      <span>
                        {state.user.first_name} {state.user.last_name}{' '}
                      </span>
                    </h1>
                  </div>
                </button>
                <Button onClick={onLogout}>로그아웃</Button>
              </>
            )}

            <Button onClick={onClick}>접속하기</Button>
          </div>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
