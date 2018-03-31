export class User {
  private id: number;
  private token: string;
  private email: string;
  private firstName: string;
  private lastName: string;
  private expirationDate: number;

  get FirstName() {
    return this.firstName;
  }

  get LastName() {
    return this.lastName;
  }

  get ExpirationDate() {
    return this.expirationDate;
  }

  get Token() {
    return this.token;
  }

  get Email() {
    return this.email;
  }

  get Id() {
    return this.id;
  }

  public copyInto(user: any) {
    this.id = user && user.id || null;
    this.firstName = user && user.first_name || null;
    this.lastName = user && user.last_name || null;
    this.token = user && user.token || null;
    this.email = user && user.email || null;
    this.expirationDate = user && user.expiration_date || null;
  }

  constructor() {
  }


}
