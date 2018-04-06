export class Profile {
  title: string;
  country: string;
  phone: string;
  affiliation: string;
  lastUpdate: Date;

  public copyInto(profile: any) {
    this.title = profile && profile.title || null;
    this.country = profile && profile.country || null;
    this.phone = profile && profile.phone || null;
    this.affiliation = profile && profile.affiliation || null;
  }

  constructor() {
    this.title = 'Dr. ';
    this.country = 'Romania';
  }
}
