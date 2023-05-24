export interface Country {
  name: string;
  code: string;
  flag: string;
}

interface Paging {
  current: number;
  total: number;
}

export interface CountriesApiResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  paging: Paging;
  response: Country[];
}
