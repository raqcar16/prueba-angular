import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[] = ['name', 'surname', 'email', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private userSer: UserService, private dialog: MatDialog) {}

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    this.users = [];
    const result: any = await this.userSer.getUsers();
    this.users = result[1];
    this.dataSource.data = this.users;
  }

  async editUser(user: User) {
    const dialogRef = this.dialog.open(DialogUser, {
      width: '250px',
      data: { user: user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  async deleteUser(id: string) {
    const result: any = await this.userSer.deleteUser(id);
    if (result) {
      window.alert('Usuario eliminado');
      this.getData();
    } else {
      window.alert('Usuario no eliminado');
    }
  }
}

@Component({
  selector: 'dialog-edit',
  templateUrl: './dialog-edit.html',
  styleUrls: ['./dialog-edit.scss'],
})
export class DialogUser {
  constructor(
    public dialogRef: MatDialogRef<DialogUser>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private createrForm: FormBuilder,
    private userSer: UserService
  ) {}
  public editForm = this.createrForm.group({
    name: [this.data.user.name, [Validators.required]],
    surname: [this.data.user.surname, [Validators.required]],
    email: [this.data.user.email, [Validators.required, Validators.email]],
  });

  async edit() {
    const result = await this.userSer.editUser(
      this.data.user.id,
      this.editForm
    );
    if (result) {
      window.alert('Usuario actualizado');
      this.dialogRef.close();
    } else {
      window.alert('Error al actualizar');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
