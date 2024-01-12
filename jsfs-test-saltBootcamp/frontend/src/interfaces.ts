export enum Bootcamp {
  JSFS = 'jsfs',
  JFS = 'jfs',
  DNFS = 'dnfs'
}

export enum Role {
  INSTRUCTOR = 'instructor',
  DEVELOPER = 'developer'
}

export interface Salty {
  "id": string;
  "name": string;
  "favouriteColour": string;
  "bootcamp": Bootcamp;
  "role": Role
}