export interface SigninBody {
  email: string;
  password: string;
}

export interface SignupBody {
  email: string;
  password: string;
  birthdate: Date;
  gender: string;
}
