import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { User } from 'src/app/service/user-service/user';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataSaved = false;
  userForm: FormGroup;
  allUsers: Observable<User[]>;
  userIdUpdate;
  message = null;

  constructor(private formbuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.userForm = this.formbuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      roleId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.loadAllUsers();
  }

  getErrorEmail() {
    return this.userForm.get('email').hasError('required') ? 'Ce champ est requis' :
      this.userForm.get('email').hasError('pattern') ? 'Adresse email non valide' :
        this.userForm.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  loadAllUsers() {
    this.allUsers = this.userService.getAllUser();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const user = this.userForm.value;
    this.createUser(user);
    this.userForm.reset();
  }

  loadUserToEdit(userId: number) {
    this.userService.getUserById(userId).subscribe((user) => {
      console.log(user);
      this.message = null;
      this.dataSaved = null;
      this.userIdUpdate = user.id;
      this.userForm.controls['firstname'].setValue(user.firstname);
      this.userForm.controls['lastname'].setValue(user.lastname);
      this.userForm.controls['email'].setValue(user.email);
      this.userForm.controls['password'].setValue(user.password);
      this.userForm.controls['roleId'].setValue(user.roleId);

      console.log(this.userIdUpdate);
    },
    error  => {
    console.log('Error', error);
    });
  }

  createUser(user: User) {
    if (this.userIdUpdate == null) {
      this.userService.createUser(user).subscribe(
        data => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été ajouté';
          this.loadAllUsers();
          this.userIdUpdate = null;
          this.userForm.reset();
        }
      );
    } else {
      user.id = this.userIdUpdate;
      this.userService.updateUser(user).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été modifié';
          this.loadAllUsers();
          this.userIdUpdate = null;
          this.userForm.reset();
        }
      );
    }
  }

  deleteUser(userId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été supprimé';
          this.loadAllUsers();
          this.userIdUpdate = null;
          this.userForm.reset();
        }
      );
    }
  }

  resetForm() {
    this.userForm.reset();
    this.userForm.markAsUntouched();
    this.message = null;
    this.dataSaved = false;
  }

}
