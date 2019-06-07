import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { User } from 'src/app/service/user-service/user';
import { UserService } from 'src/app/service/user-service/user.service';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserComponent } from 'src/app/model/user/user.component';
import { Role } from 'src/app/service/role-service/role';
import { RoleService } from 'src/app/service/role-service/role.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  dataSaved = false;
  userForm: FormGroup;
  message = null;
  title: String = 'Ajouter un utilisateur';
  userToUpdate: User;
  roles: Role[];
  userIdUpdate;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      if ( data != null && data.userToUpdate != null) {
        this.userToUpdate = data.userToUpdate;
        this.userIdUpdate = data.userToUpdate.id;
      }
    }

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

    if (this.userToUpdate != null) {
      this.title = 'Modifier un utilisateur';
      this.loadUserToEdit(this.userToUpdate);
    }

    // Recupere les roles dynamiquement
    this.roleService.getAllRole().subscribe(
      (data) => {
        this.roles = data;
    });

  }

  getErrorEmail() {
    return this.userForm.get('email').hasError('required') ? 'Ce champ est requis' :
      this.userForm.get('email').hasError('pattern') ? 'Adresse email non valide' :
        this.userForm.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  onFormSubmit() {
    this.dataSaved = false;
    const user = this.userForm.value;
    this.createUser(user);
  }

  loadUserToEdit(user: User) {
      this.message = null;
      this.dataSaved = null;

      this.userForm.controls['firstname'].setValue(user.firstname);
      this.userForm.controls['lastname'].setValue(user.lastname);
      this.userForm.controls['email'].setValue(user.email);
      this.userForm.controls['password'].setValue(user.password);
      this.userForm.controls['roleId'].setValue(user.roleId);
  }

  createUser(user: User) {
    if (this.userToUpdate == null) {
      this.userService.createUser(user).subscribe(
        data => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été ajouté';
          this.closeForm();
        }
      );
    } else {
      // On set l'id de l'utilisateur à modifié pour que le service appelle la bonne URL
      user.id = this.userIdUpdate;

      this.userService.updateUser(user).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été modifié';
          this.closeForm();
        },
        error  => {
          console.log('Error', error);
          }
      );
    }
  }

  resetForm() {
    this.userForm.reset();
    this.userForm.markAsUntouched();
    this.message = null;
    this.userIdUpdate = null;
    this.dataSaved = false;
  }

  closeForm() {
    this.userForm.reset();
    this.userForm.markAsUntouched();
    this.dialogRef.close(this.message);
    this.message = null;
    this.userIdUpdate = null;
    this.dataSaved = false;
  }

}
