import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserMeetings from '../../containers/user/UserMeetings';

interface UpcomingsTabProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const UpcomingsTab: React.FC<UpcomingsTabProps> = ({ match }) => (
  <UserMeetings id={match.params.id} tab="upcoming" />
);

export default UpcomingsTab;
