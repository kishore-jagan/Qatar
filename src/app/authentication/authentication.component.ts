import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { pass } from 'three/webgpu';

@Component({
    selector: 'app-authentication',
    imports: [HttpClientModule, CommonModule, FormsModule],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.css',
    providers: [AuthService]
})
export class AuthenticationComponent {
email!:string;
password!:string;
constructor(
  private router: Router,
  private auth: AuthService,
  private toast:ToastrService
){

}
loging(){
  console.log(this.email, this.password);
}
login(event:Event){
  event.preventDefault();
  const credentials ={
    email: this.email,
    password: this.password
  }
  console.log(credentials);
  try {
    this.auth.login(credentials).subscribe(
      (response) => {
        console.log(response);
        this.toast.success("","Success")
        this.router.navigate(['/base']);
      },
      (error) => {
        console.log(error);
        this.toast.error('Invalid Credentials', "Login Failed")

      }
      
    )
  } catch (error) {
    
  }
}
}
