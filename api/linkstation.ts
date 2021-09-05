export interface ILinkstations {
  linkstations: ILinkstation[];
}
export interface ILinkstation {
  pointX: number;
  pointY: number;
  reach: number;
}

export class Linkstations implements ILinkstations {
  public constructor(public linkstations: ILinkstation[] = []) {}
}
