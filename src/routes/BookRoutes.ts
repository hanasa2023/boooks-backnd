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

async function createBookInList(req: IReq, res: IRes) {
  const listName: string | undefined = req.header('list-name')
  if (listName != undefined) {
    const files: string[] = await BookService.uploadBooksInList(
      req,
      res,
      listName,
    )

    files.forEach(async (fileName) => {
      const bookData: BookData = {
        name: fileName.substring(0, fileName.lastIndexOf('.')),
        listName: listName,
        fullName: fileName,
      }

      await BookService.createBooksInList(bookData)
    })

    return res
      .status(HttpStatusCodes.OK)
      .json({ code: 200, msg: 'Succefully create books' })
  }
}

async function uploadBookImgsInList(req: IReq, res: IRes) {
  const listName: string | undefined = req.header('list-name')
  if (listName != undefined) {
    await BookService.uploadBooksImgInList(req, res, listName)

    return res
      .status(HttpStatusCodes.OK)
      .json({ code: 200, msg: 'Succefully upload book img' })
  }
}

async function deleteBook(req: IReq<{ bookName: string }>, res: IRes) {
  const { bookName } = req.body
  const r = await BookService.deleteBook(bookName)

  return res.status(HttpStatusCodes.OK).json({ code: 200, msg: r })
}

export default {
  getBooksByList,
  createBookInList,
  uploadBookImgsInList,
  deleteBook,
} as const
