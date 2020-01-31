import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';

const softwareNameListQuery = gql `
    query allSoftwares{
      allSoftwares{
        name
      }
    }
`;

const submitClient = gql `
    mutation createClient ($firstname: String, $lastname: String, $email: String, $phone: String, $age: String, $software: String){
        createClient (firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, age: $age, software: $software){
            firstname
            lastname
            email
            phone
            age
        }
    }
`;


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  rForm: FormGroup;
  allSoftwares: any[] = [];
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  age: string;
  software: string;
  private query: QueryRef<any>;


  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.rForm = fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      age: [null, Validators.required],
      software: [null, Validators.required]
    });
  }
// l
  createClient() {
    console.log(this.rForm.controls.software.value);
    this.apollo.mutate({
      mutation: submitClient,
      variables: {
        firstname: this.rForm.controls.firstname.value,
        lastname: this.rForm.controls.lastname.value,
        email: this.rForm.controls.email.value,
        phone: this.rForm.controls.phone.value,
        age: this.rForm.controls.age.value,
        software: this.rForm.controls.software.value
      }
    }).subscribe(data => {
      console.log(data);
    });
  }
// ffff

  getSoftwareNameList() {
    this.query = this.apollo.watchQuery({
      query: softwareNameListQuery
    });
    this.query.valueChanges.subscribe(result => {
      this.allSoftwares = result.data && result.data.allSoftwares;
      console.log(this.allSoftwares);
    });
  }

  ngOnInit() {
    this.getSoftwareNameList();
  }

}
