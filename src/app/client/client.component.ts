import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const clientListQuery = gql `
    query allClients{
        allClients {
            firstname
            lastname
          softwareSet{
            name
          }
        }
    }
`;
const softwareNameListQuery = gql `
    query allSoftwares{
        allSoftwares {
            name
        }
    }
`;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  sortByAlpha = false;
  allClients: any[] = [];
  allSoftwares: any[] = [];
  error: any;
  rForm: FormGroup;
  private query: QueryRef<any>;
  selectedClient: any;

  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.rForm = fb.group({
      softwareName: [null, Validators.required]
    });
  }


  onSelect(client: any) {
    this.selectedClient = client;
  }

  sortFunktion() {
    this.sortByAlpha = !this.sortByAlpha;
    if (this.sortByAlpha) {
      this.allClients.sort((a, b) => a.firstname.localeCompare(b.firstname));
    } else {
      this.allClients.sort((a, b) => b.firstname.localeCompare(a.firstname));
    }
  }

  getSoftwareNameList() {
    this.query = this.apollo.watchQuery({
      query: softwareNameListQuery
    });
    this.query.valueChanges.subscribe(result => {
      this.allSoftwares = result.data && result.data.allSoftwares;
      this.error = result.errors;
      // console.log(this.allSoftwares);
    });
  }

  addSoftware(post) {}

  getClientList() {
    this.query = this.apollo.watchQuery({
      query: clientListQuery
    });
    this.query.valueChanges.subscribe(result => {
      // console.log(result.data);
      this.allClients = result.data && result.data.allClients;
      // console.log(this.allClients);
    });
  }

  ngOnInit() {
    this.getClientList();
    this.getSoftwareNameList();
  }

}
