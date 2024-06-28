import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {DialogboxdeleteComponent} from "../dialogboxdelete/dialogboxdelete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private dialog : MatDialog,
  ) {
  }

  isProfile : boolean = false;

  public onProfileClick() {
    this.isProfile=!this.isProfile;
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogboxdeleteComponent, {
      width : '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  public clearToken(){
    sessionStorage.clear();
  }

}
