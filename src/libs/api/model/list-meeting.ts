export interface ListMeetingModel {
  created_at: Date;
  agenda: string;
  duration: number;
  host_id: string;
  id: number;
  join_url: string;
  start_time: any;
  timezone: string;
  topic: string;
  type: number;
  uuid: string;
}

export interface ListMeetingResponse {
  ok: boolean;
  error: any;
  page_count?: number;
  page_number?: number;
  page_size?: number;
  next_page_token?: string;
  meetings?: ListMeetingModel[];
}
