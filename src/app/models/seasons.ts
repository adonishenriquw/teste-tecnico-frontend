interface Paging {
  current: number;
  total: number;
}

export interface SeasonsApiResponse {
  get: string;
  parameters: any;
  errors: any[];
  results: number;
  paging: Paging;
  response: number[];
}
