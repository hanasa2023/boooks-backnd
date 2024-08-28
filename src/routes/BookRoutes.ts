import { Book } from '@prisma/client'
import { IReq, IRes } from './types/express/misc'
import BookService from '@src/services/BookService'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { BookData } from '@src/util/typing'

async function getBooksByList(req: IReq<{ listName: string }>, res: IRes) {
  const { listName } = req.body
  const books: Book[] = await BookService.getBooksByList(listName)

  return res.status(HttpStatusCodes.OK).json(books)
}

async function createBookInList(req: IReq<BookData>, res: IRes) {
  const bookData = req.body
  const r = await BookService.createBooksInList(bookData)

  return res.status(HttpStatusCodes.OK).json({ code: 200, msg: r })
}

async function deleteBook(req: IReq<{ bookName: string }>, res: IRes) {
  const { bookName } = req.body
  const r = await BookService.deleteBook(bookName)

  return res.status(HttpStatusCodes.OK).json({ code: 200, msg: r })
}

export default {
  getBooksByList,
  createBookInList,
  deleteBook,
} as const
