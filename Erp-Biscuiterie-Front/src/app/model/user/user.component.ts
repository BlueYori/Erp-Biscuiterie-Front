import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';


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
    this.userForm = this.formbuilder.group({
      UserFirstname: ['', [Validators.required]],
      UserLastname: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Role: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.allUsers = this.userService.getAllUser();
    console.log(this.allUsers);
  }

  onFormSubmit() {
    this.dataSaved = false;
    const user = this.userForm.value;
    this.createUser(user);
    this.userForm.reset();
  }

  loadUserToEdit(userId: number) {
    this.userService.getUserById(userId).subscribe(user => {
      this.message = null;
      this.dataSaved = null;
      this.userIdUpdate = user.id;
      this.userForm.controls['UserFirstname'].setValue(user.firstname);
      this.userForm.controls['UserLastname'].setValue(user.lastname);
      this.userForm.controls['Email'].setValue(user.email);
      this.userForm.controls['Password'].setValue(user.password);
      this.userForm.controls['Role'].setValue(user.roleId);
    });
  }

  createUser(user: User) {
    if (this.userIdUpdate == null) {
      this.userService.createUser(user).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved Succesfully';
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
          this.message = 'Record updated succesfully';
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
          this.message = 'Record deleted successfully';
          this.loadAllUsers();
          this.userIdUpdate = null;
          this.userForm.reset();
        }
      );
    }
  }

  resetForm() {
    this.userForm.reset();
    this.message = null;
    this.dataSaved = false;
  }

}
