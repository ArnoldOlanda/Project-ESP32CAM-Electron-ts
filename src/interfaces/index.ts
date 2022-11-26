/*export interface initialState{
    user: string;
    actualHost?: string;
    cameras: Camera[];
    token?: string;
    users: UsersArr[];
    type?: boolean;
}*/

export interface initialState{
  user: string;
  id:number;
  actualHost?: string;
  cameras?:  Camera[];
  token?: string;
  users?: UsersArr[];
  type?: boolean;
}

export interface ResponseLogin {
    cameras: Camera[];
    token:   string;
    user:    User;
    id: number;
    users:   UsersArr[];
    msg?:     string;
}

export interface Camera {
    id:    number;
    ip:    string;
    name:  string;
    owner: number;
}

export interface User {
    id:        number;
    password_: string;
    type_:     boolean;
    user:      string;
}

export interface UsersArr {
    id:       number;
    password: string;
    user:     string;
}
