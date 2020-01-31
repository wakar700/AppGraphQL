import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const softwareListQuery = gql `
  query allSoftwares{
    allSoftwares {
        name
        price
        system
        disc
    }
  }
`;

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  sortByAlpha = false;
  allSoftwares: any[] = [];
  private query: QueryRef<any>;
  selectedSoftware: any;
  constructor(private apollo: Apollo) { }

  onSelect(software: any) {
    this.selectedSoftware = software;
    // console.log(this.selectedSoftware);
  }

  sortFunktion() {
    this.sortByAlpha = !this.sortByAlpha;
    if (this.sortByAlpha) {
      this.allSoftwares.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.allSoftwares.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  getSoftwareList() {
    this.query = this.apollo.watchQuery({
      query: softwareListQuery,
      variables: {offset: 3}
    });
    this.query.valueChanges.subscribe(result => {
      this.allSoftwares = result.data && result.data.allSoftwares;
    });
  }

  ngOnInit() {
    this.getSoftwareList();
  }



}
