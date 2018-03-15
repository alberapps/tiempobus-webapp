export interface IFavorite {
  num: string,
  title: string,
  description: string
}

export class Favorite implements IFavorite {
  num: string = '';
  title: string = '';
  description: string = '';

}
