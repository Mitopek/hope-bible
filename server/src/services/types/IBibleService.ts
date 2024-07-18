export interface IBibleService {
  getChapter(bibleShortname: string, book: string, chapter: number): Promise<any>
}