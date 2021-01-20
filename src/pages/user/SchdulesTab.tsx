import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface SchdulesTabProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const SchdulesTab: React.FC<SchdulesTabProps> = () => <div>Test</div>;

export default SchdulesTab;
