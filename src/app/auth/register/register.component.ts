import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!:FormGroup ;
  isLogedIn=false;
  isLoginFailed=false;
  errorMessage='';
  roles:string[]=[];
  submitted:boolean = false ;
  existingFullnames: string[] = []; 
  constructor(private authservice : AuthService , 
    private tokenservice : TokenstorageService ,
    private fb:FormBuilder,
    private router:Router){}
    ngOnInit(): void {
      if(this.tokenservice.getToken()!= null){
        this.isLogedIn = true;
        this.roles = this.roles;
       // alert('on est connecte'+this.isLogedIn+"role :"+this.roles);
      }
  
      this.form = this.fb.group({
        username: ['' , Validators.required] ,
        fullname: ['', [Validators.required], [this.uniqueFullnameValidator(this.existingFullnames)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required, Validators.minLength(6)],
        password: ['' , [Validators.required , Validators.minLength(6)]] ,
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.passwordMatchValidator
  
      });
    }
    passwordMatchValidator(form: FormGroup) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
    
      const confirmPasswordControl = form.get('confirmPassword');
    
      if (confirmPasswordControl) {
        if (password !== confirmPassword) {
          confirmPasswordControl.setErrors({ mismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      }
    }
    
    uniqueFullnameValidator(existingFullnames: string[]): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (existingFullnames.includes(value)) {
          return { 'uniqueFullname': { value: value } };
        }
        return null;
      };
    }
    
    get username ()
    {
      return this.form.get('username')
    }
    get password()
    {
      return this.form.get('password')
    }
    get fullname ()
    {
      return this.form.get('fullname')
    }
    get phone(){return this.form.get('phone')}
    onSubmit(){
      this.submitted = true ;
      if(this.form.invalid)
      {
        return ;
      }
      this.authservice.register(this.form.value).subscribe(
  
        data => {
          this.tokenservice.saveToken(data.token)
          this.tokenservice.saveUser(JSON.stringify(data));
          this.submitted = false ;
          this.isLoginFailed = false;
          this.isLogedIn = true;
          this.roles = this.roles;
          
        },
        error => {
          this.isLoginFailed = true;
          this.isLogedIn = false;
        }
      );
     
    }

}