
import {
  Component,
  OnInit,
  Input,
   
} from '@angular/core';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css'],
})
export class MyteamComponent implements OnInit {
  @Input() dataArray: any[] = [];

  constructor() {}

  ngOnInit(): void {}


  isTeamsVisible = false;

  toggleVisibility() {
    this.isTeamsVisible = !this.isTeamsVisible;
  }
}
