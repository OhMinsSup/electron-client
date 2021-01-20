import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/common/Header';
import UserPage from './user/UserPage';

interface UserInfoPageProps {}
const UserInfoPage: React.FC<UserInfoPageProps> = () => (
  <>
    <Header />
    <div className="h-screen w-screen">
      <div className="pb-16">
        <Switch>
          <Route
            path={['/@:id', '/@:id/:tab(meeting|recording|test)']}
            component={UserPage}
            exact
          />
        </Switch>
      </div>
    </div>
  </>
);

export default UserInfoPage;
