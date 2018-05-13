import {User} from '../../authentication/user';

export class Paper {
  public id: number;
  public user: User;
  public editor: User;
  public title: string;
  public description: string;
  public authors: string;
  public status: string;
  public manuscript: string;
  public cover_letter: string;
  public supplementary_materials: string;
  public reviewers: User[];

  constructor() {
    this.reviewers = [];
  }

  public copyFrom(paper: any) {
    if (!paper) {
      return;
    }
    this.id = paper.id || null;
    this.user = paper.user && new User().copyInto(paper.user) || null;
    this.editor = paper.editor && new User().copyInto(paper.editor) || null;
    this.title = paper.title || null;
    this.description = paper.description || null;
    this.authors = paper.authors || null;
    this.status = paper.status || null;
    this.manuscript = paper.manuscript || null;
    this.cover_letter = paper.cover_letter || null;
    this.supplementary_materials = paper.supplementary_materials || null;
    this.addReviewers(paper);
    return this;
  }

  addReviewers(paper: any) {
    if (paper.reviewers) {
      for (const reviewer of paper.reviewers) {
        this.reviewers.push(new User().copyInto(reviewer));
      }
    }
  }
}
