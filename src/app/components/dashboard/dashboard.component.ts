import { keyframes } from '@angular/animations';
import { Component, SimpleChanges } from '@angular/core';
import { Country } from 'src/app/models/countries';
import { LeagueResponse } from 'src/app/models/leagues';
import { Player, PlayerResponse } from 'src/app/models/players';
import { StatisticsResponse } from 'src/app/models/statistics';
import { TeamResponse } from 'src/app/models/teams';
import { ApiFootballService } from 'src/app/services/api-football.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  countries: Country[] = [];
  leagues: LeagueResponse[] = [];
  teams: TeamResponse[] = [];
  seasons: any[] = [];
  players: PlayerResponse[] = [];
  statistics: StatisticsResponse = {} as StatisticsResponse;
  goals: any[] = [];

  selectedLeague: any;
  selectedSeason: any;
  selectedTeam: any;
  selectedValue: string = '';
  selectedCountryCode: string = '';

  constructor(private apiService: ApiFootballService) {
    this.getCountries();
  }

  listCountries() {
    this.getLeagues(this.selectedCountryCode);
  }
  listSeasons() {
    this.seasons = this.selectedLeague.seasons;
  }

  listTeams() {
    this.getTeams(this.selectedLeague.league.id, this.selectedSeason);
  }

  listStatistic() {
    this.getStatistics(
      this.selectedTeam.id,
      this.selectedSeason,
      this.selectedLeague.league.id
    );
    this.getPlayers(this.selectedTeam.id, this.selectedSeason);
  }

  getCountries() {
    this.apiService.getAllCountries().subscribe((res) => {
      this.countries = res.response;
    });
  }

  getLeagues(countryCode: string) {
    this.apiService.getAllLeaguesByCountryCode(countryCode).subscribe((res) => {
      this.leagues = res.response;
    });
  }

  getTeams(leagueID: string, seasonYear: string) {
    this.apiService
      .getAllTeamsByLeagueAndSeason(leagueID, seasonYear)
      .subscribe((res) => {
        this.teams = res.response;
      });
  }

  getStatistics(teamID: string, seasonYear: string, leagueID: string) {
    this.apiService
      .getAllStatisticsByTeamsAndSeason(teamID, seasonYear, leagueID)
      .subscribe((res) => {
        this.statistics = res.response;
        console.log(this.statistics);
      });
  }
  getPlayers(teamID: string, seasonYear: string) {
    this.apiService
      .getPlayersByTeamAndSeason(teamID, seasonYear)
      .subscribe((res) => {
        this.players = res.response;
      });
  }
}
