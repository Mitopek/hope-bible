import axios from 'axios'
import {$$} from "@vue-macros/reactivity-transform/macros";

export function useBibleApi() {
  async function getChapter(bibleShortname: string, book: string, chapter: number) {
    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/bible/chapter`, {
      params: {
        bibleShortname,
        book,
        chapter
      }
    })
    console.info('response.data', response.data)
    return response.data.data
  }

  async function getBibles() {
    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/bible/bibles`)
    console.info('response.data', response.data)
    return response.data.data
  }

  return $$({
    getChapter,
    getBibles,
  })
}