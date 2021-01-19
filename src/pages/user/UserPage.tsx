import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import UserProfile from '../../components/user/UserProfile';
import UserTab from '../../components/user/UserTab';
import MeetingsTab from './MeetingsTab';
import SchdulesTab from './SchdulesTab';
import UpcomingsTab from './UpcomingsTab';

interface UserPageProps
  extends RouteComponentProps<{
    id: string;
    tab?: 'live' | 'scheduled' | 'upcoming';
  }> {}
const UserPage: React.FC<UserPageProps> = ({ match }) => {
  const { id, tab } = match.params;
  return (
    <div className="sm:mx-auto max-w-3xl">
      <UserProfile id={id} />
      <UserTab id={id} tab={tab || 'live'} />
      <Route path="/@:id" exact component={MeetingsTab} />
      <Route path="/@:id/live" exact component={MeetingsTab} />
      <Route path="/@:id/scheduled" exact component={SchdulesTab} />
      <Route path="/@:id/upcoming" exact component={UpcomingsTab} />
    </div>
  );
}

export default UserPage;
