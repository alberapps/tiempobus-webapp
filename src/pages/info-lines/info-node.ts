export interface IInfoNode {
  num: String,
  name: String,
  coordinates: String
}

export class InfoNode implements IInfoNode {
  num: String = '';
  name: String = '';
  coordinates: String = '';

}
