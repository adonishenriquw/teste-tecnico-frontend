import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountriesApiResponse } from '../models/countries';
import { Observable } from 'rxjs';
import { LeaguesApiResponse } from '../models/leagues';
import { SeasonsApiResponse } from '../models/seasons';
import { TeamsApiResponse } from '../models/teams';
import { StatisticsApiResponse } from '../models/statistics';
import { PlayersApiResponse } from '../models/players';

@Injectable({
  providedIn: 'root',
})
export class ApiFootballService {
  constructor(private httpClient: HttpClient) {}

  endpoint = 'https://api-football-v1.p.rapidapi.com/v3';

  header = {
    'X-RapidAPI-Key': 'ade395f426mshd0efa0c85ed8aa8p1e7e32jsn07d17897afb0',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  };

  requestHeaders = {
    headers: new HttpHeaders(this.header),
  };

  getAllCountries(): Observable<CountriesApiResponse> {
    return this.httpClient.get<CountriesApiResponse>(
      `${this.endpoint}/countries`,
      this.requestHeaders
    );
  }
  getAllLeaguesByCountryCode(
    countryCode: string
  ): Observable<LeaguesApiResponse> {
    return this.httpClient.get<LeaguesApiResponse>(
      `${this.endpoint}/leagues?code=${countryCode}`,
      this.requestHeaders
    );
  }
  getAllSeasons(): Observable<SeasonsApiResponse> {
    return this.httpClient.get<SeasonsApiResponse>(
      `${this.endpoint}/seasons`,
      this.requestHeaders
    );
  }
  getAllTeamsByLeagueAndSeason(
    leagueID: string,
    seasonYear: string
  ): Observable<TeamsApiResponse> {
    return this.httpClient.get<TeamsApiResponse>(
      `${this.endpoint}/teams?league=${leagueID}&season=${seasonYear}`,
      this.requestHeaders
    );
  }
  getAllStatisticsByTeamsAndSeason(
    teamID: string,
    seasonYear: string,
    leagueID: string
  ): Observable<StatisticsApiResponse> {
    return this.httpClient.get<StatisticsApiResponse>(
      `${this.endpoint}/teams/statistics?league=${leagueID}&team=${teamID}&season=${seasonYear}`,
      this.requestHeaders
    );
  }
  getPlayersByTeamAndSeason(
    teamID: string,
    seasonYear: string
  ): Observable<PlayersApiResponse> {
    return this.httpClient.get<PlayersApiResponse>(
      `${this.endpoint}/players?season=${seasonYear}&team=${teamID}`,
      this.requestHeaders
    );
  }
}
