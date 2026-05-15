import type Token from "./Token";

export default class User {
  email: string;
  role: string[];
  avatar?: string;
  name?: string;
  phone?: string;
  gioiTinh?: string;
  token?: Token;

  constructor(
    email: string,
    role: string[],
    avatar?: string,
    name?: string,
    phone?: string,
    gioiTinh?: string,
    token?: Token,
  ) {
    this.email = email;
    this.role = role;
    this.avatar = avatar;
    this.name = name;
    this.phone = phone;
    this.gioiTinh = gioiTinh;
    this.token = token;
  }
}
