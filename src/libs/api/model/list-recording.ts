export interface ListRecordingResponse {
  error: any;
  from: string;
  meetings: any[];
  next_page_token: string;
  ok: boolean;
  page_count: number;
  page_size: number;
  to: string;
  total_records: number;
}
