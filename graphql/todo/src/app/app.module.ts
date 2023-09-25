import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { GraphQLModule } from './graphql1.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card'
import { HttpLink } from 'apollo-angular/http';
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { InMemoryCache } from '@apollo/client/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    // GraphQLModule,
    ApolloModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link:  httpLink.create({
          uri: 'https://chief-loon-25.hasura.app/v1/graphql',
          // uri: 'https://hasura.io/learn/graphql',
            headers: new HttpHeaders({
              'content-type': 'application/json',
              'x-hasura-admin-secret': 'FAffeSUeUHyjd0mXrbOcKMfuye1xILZwLePllscJmHqYYBTgIuyucY9ezo7z9szo'
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        })
      };
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
