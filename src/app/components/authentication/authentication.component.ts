import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFootballService } from 'src/app/services/api-football.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  public apiKey: string = '';
  public authorized: boolean = false;

  constructor(
    private service: ApiFootballService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.storage.getApiKey() && this.storage.getIsValid() === 'true') {
      this.router.navigate(['dashboard']);
    }
  }

  public validateKey(apiKey: string) {
    this.service.validadeApiKey(apiKey).subscribe(
      (res) => {
        this.authorized = true;
        this.storage.setApiKey(apiKey);
        this.storage.setIsValid('true');
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.authorized = false;
        this.storage.setIsValid('false');
        window.alert('Não foi possível validar sua ApiKey');
      }
    );
  }
}
