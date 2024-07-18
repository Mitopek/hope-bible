import {IBibleService} from "./types/IBibleService.js";
import axios from 'axios'
import {injectable} from "inversify";


@injectable()
export class BibleService implements IBibleService {

  public async getChapter(bibleShortname: string, book: string, chapter: number): Promise<any> {
    console.info('bibleType', bibleShortname, 'book', book, 'chapter', chapter)
    const response = await axios.get(`https://www.biblia.info.pl/api/biblia/${bibleShortname}/${book}/${chapter}`)
    console.info('response.data', response.data)
    return response.data
  }
}