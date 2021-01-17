import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderContainer from '../containers/base/HeaderContainer';
import UserPage from './user/UserPage';

interface UserInfoPageProps {}
const UserInfoPage: React.FC<UserInfoPageProps> = () => {
  console.log('good');
  return (
    <>
      <HeaderContainer />
      <div className="h-screen w-full">
        <div className="pb-16">
          <Switch>
            <Route
              path={['/@:id', '/@:id/:tab(my|meeting|meetings)']}
              component={UserPage}
              exact
            />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default UserInfoPage;
