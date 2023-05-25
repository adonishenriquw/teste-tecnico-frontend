import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountriesApiResponse } from '../models/countries';
import { Observable } from 'rxjs';
import { LeaguesApiResponse } from '../models/leagues';
import { SeasonsApiResponse } from '../models/seasons';
import { TeamsApiResponse } from '../models/teams';
import { StatisticsApiResponse } from '../models/statistics';
import { PlayersApiResponse } from '../models/players';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiFootballService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageService
  ) {}
  endpoint = 'https://api-football-v1.p.rapidapi.com/v3';

  getAllCountries(): Observable<CountriesApiResponse> {
    const headers = this.createHeaders();
    return this.httpClient.get<CountriesApiResponse>(
      `${this.endpoint}/countries`,
      headers
    );
  }
  getAllLeaguesByCountryCode(
    countryCode: string
  ): Observable<LeaguesApiResponse> {
    const headers = this.createHeaders();
    return this.httpClient.get<LeaguesApiResponse>(
      `${this.endpoint}/leagues?code=${countryCode}`,
      headers
    );
  }
  getAllSeasons(): Observable<SeasonsApiResponse> {
    const headers = this.createHeaders();
    return this.httpClient.get<SeasonsApiResponse>(
      `${this.endpoint}/seasons`,
      headers
    );
  }
  getAllTeamsByLeagueAndSeason(
    leagueID: string,
    seasonYear: string
  ): Observable<TeamsApiResponse> {
    const headers = this.createHeaders();
    return this.httpClient.get<TeamsApiResponse>(
      `${this.endpoint}/teams?league=${leagueID}&season=${seasonYear}`,
      headers
    );
  }
  getAllStatisticsByTeamsAndSeason(
    teamID: string,
    seasonYear: string,
    leagueID: string
  ): Observable<StatisticsApiResponse> {
    const headers = this.createHeaders();
    return this.httpClient.get<StatisticsApiResponse>(
      `${this.endpoint}/teams/statistics?league=${leagueID}&team=${teamID}&season=${seasonYear}`,
      headers
    );
  }
  getPlayersByTeamAndSeason(
    teamID: string,
    seasonYear: string
  ): Observable<PlayersApiResponse> {
    const headers = this.createHeaders();
    return this.httpClient.get<PlayersApiResponse>(
      `${this.endpoint}/players?season=${seasonYear}&team=${teamID}`,
      headers
    );
  }

  createHeaders(apiKey?: string) {
    let header = {
      'X-RapidAPI-Key': apiKey || (this.storage.getApiKey() as string),
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };

    return {
      headers: new HttpHeaders(header),
    };
  }

  validadeApiKey(apiKey: string) {
    const headers = this.createHeaders(apiKey);
    return this.httpClient.get<any>(`${this.endpoint}/countries`, headers);
  }
}
