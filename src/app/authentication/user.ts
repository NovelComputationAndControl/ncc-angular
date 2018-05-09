export class User {
  id: number;
  profile_pk: number;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  expirationDate: number;
  is_staff: boolean;

  public copyInto(user: any) {
    this.id = user && user.id || null;
    this.profile_pk = user && user.profile_pk || null;
    this.firstName = user && user.first_name || null;
    this.lastName = user && user.last_name || null;
    this.token = user && user.token || null;
    this.email = user && user.email || null;
    this.expirationDate = user && user.expiration_date || null;
    this.is_staff = user && user.is_staff || null;
    return this;
  }

  constructor() {
  }


}
