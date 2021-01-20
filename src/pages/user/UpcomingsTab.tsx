import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface UpcomingsTabProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const UpcomingsTab: React.FC<UpcomingsTabProps> = () => <div>Test</div>;

export default UpcomingsTab;
