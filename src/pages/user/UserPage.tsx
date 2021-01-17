import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import UserProfile from '../../components/user/UserProfile';
import UserTab from '../../components/user/UserTab';
import MeetingsTab from './MeetingsTab';

interface UserPageProps
  extends RouteComponentProps<{
    id: string;
    tab?: 'meetings' | 'meeting' | 'my';
  }> {}
const UserPage: React.FC<UserPageProps> = ({ match }) => {
  const { id, tab } = match.params;
  console.log(id, tab);
  return (
    <div className="ml-auto mr-auto max-w-3xl">
      <UserProfile id={id} />
      <UserTab id={id} tab={tab || 'meetings'} />
      <Route path="/@:id" exact component={MeetingsTab} />
      <Route path="/@:id/my" exact component={() => <>생성</>} />
      <Route path="/@:id/meetings" exact component={MeetingsTab} />
      <Route path="/@:id/meeting" exact component={() => <>리스트</>} />
    </div>
  );
};

export default UserPage;
