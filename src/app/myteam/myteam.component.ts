// myteam.component.ts

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
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

  //  @Input() selectedTeamMembers: any[] = [];

  // data: any[] = [];

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['selectedTeamMembers']) {
  //     this.processSelectedTeamMembers();
  //   }
  // }

  // processSelectedTeamMembers() {
  //   // Perform any processing logic here based on selectedTeamMembers
  //   // For example, you might want to filter or transform the data
  //   this.data = this.selectedTeamMembers.map((member) => ({
  //     // Transform the data as needed
  //     name: member.first_name + ' ' + member.last_name,
  //     email: member.email,
  //     // Add more properties as needed
  //   }));
  // }

  isTeamsVisible = false;

  toggleVisibility() {
    this.isTeamsVisible = !this.isTeamsVisible;
  }
}
