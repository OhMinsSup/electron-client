import React from 'react';
import { FiUpload as UploadIcon } from 'react-icons/fi';
import { RecordingAPI } from '../../libs/api/client';
import Button from './Button';

interface UploadButtonProps {}
const UploadButton: React.FC<UploadButtonProps> = () => {
  const onUpload = React.useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];
      if (!file) return;

      await RecordingAPI.uploadRecording(file);
    };
    input.click();
  }, []);
  return (
    <div className="flex w-full py-4 flex-row-reverse">
      <Button type="button" size="large" onClick={onUpload}>
        <UploadIcon />
        <span className="px-3">업로드</span>
      </Button>
    </div>
  );
};

export default UploadButton;
