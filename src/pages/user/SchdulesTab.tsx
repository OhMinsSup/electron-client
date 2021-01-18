import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserMeetings from '../../containers/user/UserMeetings';

interface SchdulesTabProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const SchdulesTab: React.FC<SchdulesTabProps> = ({ match }) => (
  <UserMeetings id={match.params.id} tab="scheduled" />
);

export default SchdulesTab;
