import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  form!:FormGroup ;
  isLogedIn=false;
  isLoginFailed=false;
  errorMessage='';
  roles:Roles[]=[];
  submitted:boolean = false ;
  constructor(private authservice : AuthService , 
              private tokenservice : TokenstorageService ,
              private fb:FormBuilder,
              private router:Router){}
  ngOnInit(): void {
    if(this.tokenservice.getToken()!= null){
      this.isLogedIn = true;
      this.roles = this.tokenservice.getUser().role;
     // alert('on est connecte'+this.isLogedIn+"role :"+this.roles);
    }

    this.form = this.fb.group({
      username: ['' , Validators.required] ,
      password: ['' , [Validators.required , Validators.minLength(8)]] ,

    })
  }


  get username ()
  {
    return this.form.get('username')
  }
  get password()
  {
    return this.form.get('password')
  }
  onSubmit(){
    
    /*this.submitted = true ;
    if(this.form.invalid)
    {
      return ;
    }*/
    
    this.authservice.login(this.form.value).subscribe(

      data => {
        this.tokenservice.saveToken(data.token)
        this.tokenservice.saveUser(JSON.stringify(data));
        this.submitted = false ;
        this.isLoginFailed = false;
        this.isLogedIn = true;
        this.roles = this.tokenservice.getUser().role;
        this.router.navigate(['/admin/dashboard'])
      },
      error => {
        this.isLoginFailed = true;
        this.isLogedIn = false;
      }
    );
   
  }
  isAdmin(): boolean {
    return this.authservice.hasAccess({ cdRole: 'ROLE_ADMIN' });
  }
  isUser(): boolean {
    return this.authservice.hasAccess({ cdRole: 'ROLE_USER' });
  }
}
