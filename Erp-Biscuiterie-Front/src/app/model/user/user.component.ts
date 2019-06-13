import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, merge } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { User } from 'src/app/service/user-service/user';
import { UserService } from 'src/app/service/user-service/user.service';
import { UserAddComponent } from 'src/app/view/user-add/user-add.component';
import { RoleService } from 'src/app/service/role-service/role.service';
import { Role } from 'src/app/service/role-service/role';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataSaved = false;
  // allUsers: Observable<User[]>;
  message = null;

  // Table
  public displayedColumns = ['id', 'firstname', 'email', 'roleId', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private formbuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private roleService: RoleService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  openDialog(user: User = null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    // Si user non null, alors on update cet user -> On passe l'user a UserAddComponent
    if (user != null) {
      dialogConfig.data = {
        userToUpdate: user
      };
    }

    const dialogRef = this.dialog.open(UserAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.loadAllUsers();

        if (data != null) {
          this.message = data;
        }
      }
    );
  }

  loadAllUsers() {
    // Double appel dégueu, a revoir
    // this.allUsers = this.userService.getAllUser();


    forkJoin( this.userService.getAllUser(), this.roleService.getAllRole() ).subscribe(
      result => {

      const users: User[] = result[0];
      const roles: Role[] = result[1];
      this.dataSource.data = users.map(user => {
        // ton blabla
        const roleFind = roles.find(role => role.id === user.roleId);
        return {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          roleId: user.roleId,
          roleNamee: roleFind.name
        };
      });
    });
  }

  loadUserToEdit(user: User) {
      this.message = null;
      this.dataSaved = null;

      this.openDialog(user);
  }

  deleteUser(userId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été supprimé';
          this.loadAllUsers();
        }
      );
    }
  }

}

