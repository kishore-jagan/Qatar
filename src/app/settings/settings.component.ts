import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GeneralComponent } from './general/general.component';
import { AppearanceComponent } from './appearance/appearance.component';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  activeTab: string = 'users';

  setActiveTab(tab: string) {
    this.activeTab = tab;
    console.log(tab, this.activeTab);
  }

  selectedUser: any = null;
  activeUsers = [
    {
      name: 'Allwin',
      email: 'user1@example.com',
      icon: 'fas fa-user-circle',
      activityLogs: [
        {
          timestamp: '11-16-2023 4:27 pm',
          title: 'Accessing the Account Delete',
          icon: 'account_circle',
          events: [
            {
              timestamp: '11-16-2023 4:37 pm',
              status: 'success',
              message:
                'The user "ABC" Successful event after correct password confirmation',
            },
            {
              timestamp: '11-16-2023 4:37 pm',
              status: 'failure',
              message:
                'The user "ABC" Failed event after wrong password confirmation',
            },
          ],
        },
        {
          timestamp: '11-16-2023 4:27 pm',
          title: 'Delete Process',
          icon: 'delete',
          events: [
            {
              timestamp: '11-16-2023 4:37 pm',
              status: 'success',
              message: 'The user "ABC" Success of below verifications.',
            },
            {
              timestamp: '11-16-2023 4:27 pm',
              status: 'success',
              message: 'Email Verification',
            },
            {
              timestamp: '11-16-2023 4:27 pm',
              status: 'failure',
              message: 'Phone Number Verification Rejected',
            },
            {
              timestamp: '11-16-2023 4:37 pm',
              status: 'failure',
              message:
                'The user "ABC" Failure of final delete event from the respective Seebiz Product.',
            },
          ],
        },
      ],
    },
    {
      name: 'Ganapathy',
      email: 'user2@example.com',
      icon: 'fas fa-user-circle',
    },
  ];
  // activityLogs = [
  //   {
  //     timestamp: '11-16-2023 4:27 pm',
  //     title: 'Accessing the Account Delete',
  //     icon: 'account_circle',
  //     events: [
  //       {
  //         timestamp: '11-16-2023 4:37 pm',
  //         status: 'success',
  //         message:
  //           'The user "ABC" Successful event after correct password confirmation',
  //       },
  //       {
  //         timestamp: '11-16-2023 4:37 pm',
  //         status: 'failure',
  //         message:
  //           'The user "ABC" Failed event after wrong password confirmation',
  //       },
  //     ],
  //   },
  //   {
  //     timestamp: '11-16-2023 4:27 pm',
  //     title: 'Delete Process',
  //     icon: 'delete',
  //     events: [
  //       {
  //         timestamp: '11-16-2023 4:37 pm',
  //         status: 'success',
  //         message: 'The user "ABC" Success of below verifications.',
  //       },
  //       {
  //         timestamp: '11-16-2023 4:27 pm',
  //         status: 'success',
  //         message: 'Email Verification',
  //       },
  //       {
  //         timestamp: '11-16-2023 4:27 pm',
  //         status: 'failure',
  //         message: 'Phone Number Verification Rejected',
  //       },
  //       {
  //         timestamp: '11-16-2023 4:37 pm',
  //         status: 'failure',
  //         message:
  //           'The user "ABC" Failure of final delete event from the respective Seebiz Product.',
  //       },
  //     ],
  //   },
  // ];

  constructor() {}

  selectUser(user: any) {
    this.selectedUser = user;
  }
}
