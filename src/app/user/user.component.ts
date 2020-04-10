import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  form: FormGroup;
  loading = false;
  type: 'login' | 'signup' |'reset' = 'signup';
  serverMessage: string;


  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      passwordConfirm: ['',[]]
    })
  }

   // Check what the user is trying to do based on the type defined above
   changeType(val){
    this.type = val;
  }

    // Getter Methods for our form which change HTML based on type
    get isLogin(){
      return this.type === 'login';
    }
  
    get isSignup(){
      return this.type === 'signup';
    }
  
    get isPasswordReset(){
      return this.type === 'reset';
    }
  
    // Getters for info from form when submitted
    get email(){
      return this.form.get('email')
    }
  
    get password(){
      return this.form.get('password')
    }
  
    get passwordConfirm(){
      return this.form.get('passwordConfirm')
    }
  // passwordDoesMatch checks the password field and the passwordConfirm field
  // To find equal values if there are any
    get passwordDoesMatch(){
      if(this.type !== 'signup'){
        return true
      } else {
        return this.password.value === this.passwordConfirm.value
      }
    }

    async onSubmit(){
      this.loading = true;
    const email = this.email.value // This is the form data coming from the above form
    const password = this.password.value // Same as above

    try{
      if(this.isLogin){
        await this.afAuth.signInWithEmailAndPassword(email,password) // Returns a Promise
      } else if (this.isSignup){
        await this.afAuth.createUserWithEmailAndPassword(email,password)
      } else if(this.isPasswordReset){
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check Your Email'
      }
    }
    catch(err){
      this.serverMessage = err
    }
    this.loading = false;
    }
  }
