export interface LoginBody {
  email: string;
  password: string;
};

export interface RegisterBody extends LoginBody {
  firstname: string;
  lastname: string;
}

export interface RequestCookies {
  jwt?: string;
}