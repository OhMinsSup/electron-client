import React from 'react';
import swal from 'sweetalert';
import { browserFileDownloadAPI, RecordingAPI } from '../../libs/api/client';
import { FileModel } from '../../libs/api/model/file';
import Button from '../common/Button';

interface RecordingItemProps {
  recording: FileModel;
}
const RecordingItem: React.FC<RecordingItemProps> = ({ recording }) => {
  const onDelete = React.useCallback(async () => {
    const { status } = await RecordingAPI.deleteRecording(recording.id);

    if (status === 200) {
      swal({
        title: '레코드',
        text: '레코드 삭제!',
        icon: 'success',
      }).then(() => console.log('success!'));
    }
  }, [recording.id]);

  const onDownload = React.useCallback(async () => {
    if (recording.filename && recording.url && recording.mimeType) {
      browserFileDownloadAPI(
        recording.filename,
        recording.url,
        recording.mimeType,
      );
    }
  }, [recording.url, recording.filename, recording.mimeType]);

  return (
    <article className="text-gray-800 leading-6 border-gray-300 border-b-2">
      <dl className="flex flex-wrap divide-y divide-gray-200 border-b border-gray-200">
        <div className="w-full flex-none flex items-baseline px-4 py-4">
          <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
            파일명
          </dt>
          <dd className="text-black text-sm">{recording.filename}</dd>
        </div>

        <div className="w-full flex-none flex items-baseline px-4 py-4">
          <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
            파일타입
          </dt>
          <dd className="text-black text-sm">{recording.mimeType}</dd>
        </div>

        <div className="w-full flex-none flex items-baseline px-4 py-4">
          <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
            공개 아이디
          </dt>
          <dd className="text-black text-sm">{recording.publicId}</dd>
        </div>
      </dl>
      <div className="grid grid-cols-2 gap-x-4 px-4 py-4">
        <Button color="lightGray" size="large" onClick={onDelete}>
          삭제
        </Button>
        <Button size="large" onClick={onDownload}>
          다운로드
        </Button>
      </div>
    </article>
  );
};

export default React.memo(RecordingItem);
