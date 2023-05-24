interface Coverage {
  fixtures: {
    events: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
  };
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface LeagueResponse {
  league: League;
  country: Country;
  seasons: Season[];
}

interface Paging {
  current: number;
  total: number;
}

export interface LeaguesApiResponse {
  get: string;
  parameters: {
    code: string;
  };
  errors: any[];
  results: number;
  paging: Paging;
  response: LeagueResponse[];
}
