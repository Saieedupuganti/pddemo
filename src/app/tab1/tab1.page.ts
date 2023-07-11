import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isMenuOpen: boolean = false;

  constructor(private menu: MenuController) {}

  ionViewWillEnter() {
    this.menu.isOpen().then((isOpen) => {
      this.isMenuOpen = isOpen;
    });
  }

  toggleMenu() {
    this.menu.toggle().then(() => {
      this.menu.isOpen().then((isOpen) => {
        this.isMenuOpen = isOpen;
      });
    });
  }
}
