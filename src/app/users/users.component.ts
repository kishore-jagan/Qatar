import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  isRotating = false;

  rotatePizza() {
    const pizza = document.querySelector('.pizza-container');
    if (pizza) {
      this.isRotating = !this.isRotating;
      if (this.isRotating) {
        pizza.classList.add('rotate-animation');
      } else {
        pizza.classList.remove('rotate-animation');
      }
    }
  }
}
