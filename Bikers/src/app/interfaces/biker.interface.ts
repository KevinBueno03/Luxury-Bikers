export interface Biker {
  _id: string;
  name: string;
  email: string;
  dni: string;
  phone: string;
  password: string;
  active: Boolean
}

export interface AuthResponse {
  "session_code"?: string;
}

export interface LoginResponse {
  "token"?:string;

}
