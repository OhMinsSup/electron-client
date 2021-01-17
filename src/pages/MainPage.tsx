import React from 'react';
import HeaderContainer from '../containers/base/HeaderContainer';

interface MainPageProps {}
const MainPage: React.FC<MainPageProps> = () => {
  const onZoomLogin = React.useCallback(() => {
    window.location.href = 'http://localhost:5000/api/auth/redirect/zoom';
  }, []);

  return (
    <>
      <HeaderContainer />
      <div className="h-screen flex flex-row flex-wrap bg-gray-100">
        <div className="flex-1">
          <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-screen-sm flex flex-col">
              <button
                type="button"
                onClick={onZoomLogin}
                className="text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-teal-400 hover:bg-teal-500"
              >
                Zoom 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
