import { keyframes } from '@angular/animations';
import { Component, SimpleChanges } from '@angular/core';
import { Country } from 'src/app/models/countries';
import { LeagueResponse } from 'src/app/models/leagues';
import { Player, PlayerResponse } from 'src/app/models/players';
import { StatisticsResponse } from 'src/app/models/statistics';
import { TeamResponse } from 'src/app/models/teams';
import { ApiFootballService } from 'src/app/services/api-football.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

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
  goals = false;

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
        this.drawChart(this.statistics.goals?.for.minute);
        this.goals = true;
      });
  }
  getPlayers(teamID: string, seasonYear: string) {
    this.apiService
      .getPlayersByTeamAndSeason(teamID, seasonYear)
      .subscribe((res) => {
        this.players = res.response;
      });
  }

  drawChart(goals: any) {
    if (goals['0-15']) {
      this.barChartData = {
        labels: [
          ['0-15', goals['0-15'].percentage || '0'],
          ['16-30', goals['16-30'].percentage || '0'],
          ['31-45', goals['31-45'].percentage || '0'],
          ['46-60', goals['46-60'].percentage || '0'],
          ['61-75', goals['61-75'].percentage || '0'],
          ['76-90', goals['76-90'].percentage || '0'],
          ['91-105', goals['91-105'].percentage || '0'],
          ['106-120', goals['106-120'].percentage || '0'],
        ],
        datasets: [
          {
            data: [
              goals['0-15'].total || 0,
              goals['16-30'].total || 0,
              goals['31-45'].total || 0,
              goals['46-60'].total || 0,
              goals['61-75'].total || 0,
              goals['76-90'].total || 0,
              goals['91-105'].total || 0,
              goals['106-120'].total! || 0,
            ],
            label: 'gols marcados',
          },
        ],
      };
    }
  }
  public barChartData: ChartData<'bar'> = {
    labels: [' '],
    datasets: [{ data: [] }],
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DatalabelsPlugin];
}
