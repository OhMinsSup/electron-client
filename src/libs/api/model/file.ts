export interface FileModel {
  id: number;
  userId: string;
  filename: string | null;
  mimeType: string | null;
  publicId: string | null;
  url: string | null;
  isDeleted: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface ListFileResponse {
  ok: boolean;
  error: any;
  file: {
    rows: FileModel[];
    count: number;
  };
}

export interface UploadFileResponse {
  ok: true;
  error: null;
  publicId: string;
  url: string;
  name: string;
}
