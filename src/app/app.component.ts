import { UsersService } from '@ab/data/users.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-budget';
  constructor(users: UsersService) {
    //users.postRegistration$().subscribe(res => console.log(res));
  }
}
