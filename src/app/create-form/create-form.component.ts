import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  skillsLearn = ['Angular', 'React', 'Nodejs', 'Javascript', 'HTML'];
  constructor() {}
  numberOfExp = 3;
  Details = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    skills: new FormArray([]),
    experience: new FormArray([]),
  });

  get Expertise() {
    return this.Details.get('experience') as FormArray;
  }
  onClickSkills = (event: any) => {
    let name = this.Details.get('skills') as FormArray;
    console.log(name);
    if (event.checked) {
      name.push(new FormControl(event.source.value));
    } else {
      let i = 0;
      name.controls.forEach((value, index) => {
        if (value.value === event.source.value) {
          name.removeAt(index);
        }
      });
    }
    console.log(this.Details.controls);
  };

  removeExperience = (index: number) => {
    let removel = this.Details.get('experience') as FormArray;
    removel.removeAt(index);
  };
  addExperience = () => {
    let add = this.Details.get('experience') as FormArray;
    add.push(
      new FormGroup({
        number: new FormControl(uuidv4()),
        company: new FormControl('', Validators.required),
        duration: new FormControl('', Validators.required),
        describe: new FormControl('', Validators.required),
      })
    );
  };
  onClickSubmit = () => {
    if (this.Details.status === 'VALID')
      localStorage.setItem('userDetails', JSON.stringify(this.Details.value));
  };
  ngOnInit(): void {
    for (let i = 1; i <= this.numberOfExp; i++) {
      this.addExperience();
    }
  }
}
