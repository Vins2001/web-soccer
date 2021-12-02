//import modul yg dibutuhkan
//cari modul nama atau file dan temukan
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
//interface
import { Team } from 'src/interface/team';
import { Rangking } from 'src/interface/rangking';
import { Schedule } from 'src/interface/schedule';
import { SoccerService } from '../service/Soccer.Service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})

export class StandingsComponent implements OnInit {
  public UsingAsync:boolean = false;
  public MyTeams : Team[];
  public LeagueName:string;
  public MySchedule : Schedule[];
  public Standings: Rangking[];

  constructor(private _titleService: Title, private _soccerService:SoccerService) { 
    this._titleService.setTitle('Pertandingan Sepak Bola');
    this.MyTeams=[];
    this.MySchedule=[];
    this.Standings=[];
    this.getTeams();
    this.LeagueName = "Liga Ala ala";
    this.getSchedule();
    this.computeRangking();
  }
  ngOnInit(): void {
  }
  getTeams(){
    if(this.UsingAsync){
      let xx = this._soccerService.getAllTeamsAsync();
      xx.then((Teams: Team[])=>this.MyTeams = Teams);
    }
    else {
      this.MyTeams = this._soccerService.getAllTeams();
    }
  }
  private getSchedule(){
    if (this.UsingAsync){
      let xx = this._soccerService.getScheduleAsync();
        xx.then((Schedules:Schedule[])=> this.MySchedule = Schedules);
    }else{
      this.MySchedule = this._soccerService.getSchedule();
    }
  }

  public computeRangking(){
    var curDate : Date= new Date();
    var TeamAt: number;
    this.Standings= [];
    this.MySchedule.forEach(element=> {
      //jika game telah dimainkan
      if(element.PlayingDate < curDate && element.HomeScore>=0){
        TeamAt = this.FindTeam(element.HomeTeam);
        if(TeamAt < 0){
          this.Standings.push({
            TeamName:element.AwayTeam,
            GamesPlayed:0, Winds:0, Ties:0,
            GoalsFor:0, GoalsAgaints:0
          })
          TeamAt = this.Standings.length-1;
        }
        this.UpdCurrentArrow(element, TeamAt, 'A');
      }
    });
  }
  
  private UpdCurrentArrow(element:Schedule, TeamAt:number, HomeAway:string){
    this.Standings[TeamAt].GamesPlayed++;
    if(HomeAway=='H'){
      this.Standings[TeamAt].GoalsFor += element.HomeScore;
      this.Standings[TeamAt].GoalsAgaints+= element.AwayScore;
      //menang
      if(element.HomeScore>element.AwayScore){
        this.Standings[TeamAt].Winds++;
      }
    }
    if(HomeAway=='A'){
      this.Standings[TeamAt].GoalsFor += element.AwayScore;
      this.Standings[TeamAt].GoalsFor += element.HomeScore;
      if(element.AwayScore>element.HomeScore){
        this.Standings[TeamAt].Winds++;
      }
    }
    if(element.HomeScore==element.AwayScore){
      this.Standings[TeamAt].Ties++;
    }
  }
  private FindTeam(TeamName:string):number{
    var FoundAt: number = -1;
    for(var _x=0; _x<this.Standings.length; _x++){
      if(this.Standings[_x].TeamName==TeamName){
        return _x;
      }
    }
    return FoundAt;
  }
}
