import React from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import { RecordingAPI } from '../../libs/api/client';

interface RecordingsTabProps
  extends RouteComponentProps<{ id: string; tab: string }> {}
const RecordingsTab: React.FC<RecordingsTabProps> = () => {
  console.log('recording');
  const { isLoading, error } = useQuery<any, any, any>(
    ['myRecordingData'],
    () => RecordingAPI.recordings(),
    {
      refetchInterval: 60000,
    },
  );

  if (error) {
    return (
      <div className="bg-white font-sans h-screen absolute w-full">
        An error has occurred: {error.message}
      </div>
    );
  }

  if (isLoading) return <>Loading....</>;

  return <div>recording</div>;
};

export default RecordingsTab;
