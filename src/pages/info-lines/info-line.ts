export interface IInfoLine {
  num: string,
  description: string
}

export class InfoLine implements IInfoLine {
  num: string = '';
  description: string = '';

}
