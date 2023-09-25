import { Component, OnInit } from '@angular/core';
import {Apollo, Subscription, gql} from 'apollo-angular';
import { INSERT_TODO, LOGIN, SIGNUP, TODOS } from '../graphql/graph.queries';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  todos = [];
  newDescription = 'New Task';
  $getTasksQuery: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private apollo: Apollo,
  ) {
  }

  ngOnInit() {
    // this.$getTasksQuery = 
    this.apollo
      .watchQuery({
        query: TODOS
      })
      .valueChanges
      .subscribe(result => {
        const data = result?.data;
        if (data['todos']) {
          console.log(data['todos'])
          this.todos = data['todos'];
        }
        else
          alert('error in fetching')
      })
  }

  addNewTask() {
    this.apollo
      .mutate({
        mutation: INSERT_TODO,
        variables: {
          description: this.newDescription
        },
        refetchQueries: [
          {
            query: TODOS
          }
        ]
      })
      .subscribe(data => {
        console.log(data);
      })
  }


  todoStatusUpdated(id) {
    console.log(id);
    // this.apollo
    //   .mutate()
  }
}
