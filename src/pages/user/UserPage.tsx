import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import UserProfile from '../../components/user/UserProfile';
import UserTab from '../../components/user/UserTab';
import MeetingsTab from './MeetingsTab';
import RecordingsTab from './RecordingsTab';

interface UserPageProps
  extends RouteComponentProps<{
    id: string;
    tab?: 'meeting' | 'recording';
  }> {}
const UserPage: React.FC<UserPageProps> = ({ match }) => {
  const { id, tab } = match.params;
  return (
    <div className="sm:mx-auto max-w-3xl">
      <UserProfile id={id} />
      <UserTab id={id} tab={tab || 'meeting'} />
      <Route path="/@:id" exact component={MeetingsTab} />
      <Route path="/@:id/recording" exact component={RecordingsTab} />
    </div>
  );
};

export default UserPage;
