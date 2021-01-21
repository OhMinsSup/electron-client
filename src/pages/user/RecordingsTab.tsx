import React from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import RecordingItem from '../../components/card/RecordingItem';
import EmptyBlock from '../../components/common/Empty';
import UploadButton from '../../components/common/UploadButton';
import { RecordingAPI } from '../../libs/api/client';

interface RecordingsTabProps
  extends RouteComponentProps<{ id: string; tab: string }> {}
const RecordingsTab: React.FC<RecordingsTabProps> = () => {
  const { isLoading, error, data } = useQuery<any, any, any>(
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

  return (
    <div className="px-2">
      <UploadButton />
      {data.file && data.file.rows && data.file.rows.length ? (
        <div className="space-y-5">
          {data.file.rows.map((file: any) => (
            <RecordingItem key={file.id} recording={file} />
          ))}
        </div>
      ) : (
        <EmptyBlock>
          <div className="message">레코드 정보가 없습니다.</div>
        </EmptyBlock>
      )}
    </div>
  );
};

export default RecordingsTab;
