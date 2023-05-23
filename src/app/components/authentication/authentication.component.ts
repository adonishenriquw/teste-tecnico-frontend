import { Component } from '@angular/core';
import { ApiFootballService } from 'src/app/services/api-football.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public apiKey: string = "";

  constructor(private service: ApiFootballService){

  }

  public validateKey(apiKey: string){
    console.log(apiKey)
  }

}
