import {User} from '../../authentication/user';

export class Review {
  public id: number;
  public user: User;
  public paper: number;
  public editor_review: boolean;
  public created: string;
  public appropriate: string;
  public recommendation: string;
  public comment: string;

  constructor() {
  }

  public copyFrom(review: any) {
    if (!review) {
      return;
    }
    this.id = review.id || null;
    this.user = review.user && new User().copyInto(review.user) || null;
    this.paper = review.paper || null;
    this.editor_review = review.editor_review || null;
    this.created = review.created || null;
    this.appropriate = review.appropriate || null;
    this.recommendation = review.recommendation || null;
    this.comment = review.comment || null;

    return this;
  }

}
