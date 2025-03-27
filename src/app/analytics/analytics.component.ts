import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
  providers: [],
})
export class AnalyticsComponent implements OnInit {
  selectedUser: any = null;
  activeUsers = [
    {
      name: 'User 1',
      email: 'user1@example.com',
      icon: 'user-icon-1',
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
    { name: 'User 2', email: 'user2@example.com', icon: 'user-icon-2' },
    // Add more users as needed
  ];
  activityLogs = [
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
  ];

  constructor() {}

  ngOnInit(): void {}

  selectUser(user: any) {
    this.selectedUser = user;
  }
}
