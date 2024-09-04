import { Book } from '@prisma/client'
import { prisma } from './Client'
import { BookData } from '@src/util/typing'
import fs from 'fs'
import path from 'path'
import { IReq, IRes } from '@src/routes/types/express/misc'
import multer from 'multer'

const commonPath = 'src/books'

// TODO: 自动修改封面图尺寸及格式

async function getBooksByList(listName: string): Promise<Book[]> {
  return await prisma.book.findMany({
    where: {
      listName: listName,
    },
    orderBy: {
      id: 'desc',
    },
  })
}

async function uploadBooksInList(
  req: IReq,
  res: IRes,
  listName: string,
): Promise<string[]> {
  const files: string[] = []
  const upload = multer({
    dest: path.resolve(`${commonPath}/${listName}`),
    fileFilter(req, file, callback) {
      file.originalname = Buffer.from(file.originalname, 'binary').toString(
        'utf-8',
      )
      callback(null, true)
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const newPath = path.resolve(`${commonPath}/${listName}`)
        if (!fs.existsSync(newPath)) {
          return "List don't exists"
        }
        cb(null, newPath)
      },
      filename: (req, file, callback) => {
        files.push(file.originalname)
        callback(null, file.originalname)
      },
    }),
  }).array('books')

  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        return reject(err)
      }
      resolve(files)
    })
  })
}

async function uploadBooksImgInList(
  req: IReq,
  res: IRes,
  listName: string,
): Promise<string[]> {
  const imgs: string[] = []

  const uploadImgs = multer({
    dest: path.resolve(`${commonPath}/imgs/${listName}`),
    fileFilter(req, file, callback) {
      file.originalname = Buffer.from(file.originalname, 'binary').toString(
        'utf-8',
      )
      callback(null, true)
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const newPath = path.resolve(`${commonPath}/imgs/${listName}`)
        if (!fs.existsSync(newPath)) {
          return "List don't exists"
        }
        cb(null, newPath)
      },
      filename: (req, file, callback) => {
        imgs.push(file.originalname)
        callback(null, file.originalname)
      },
    }),
  }).array('imgs')

  return new Promise((resolve, reject) => {
    uploadImgs(req, res, (err) => {
      if (err) return reject(err)
      resolve(imgs)
    })
  })
}

async function createBooksInList(bookData: BookData): Promise<string> {
  const book: Book = await prisma.book.create({
    data: {
      name: bookData.name,
      listName: bookData.listName,
      fullName: bookData.fullName,
    },
  })

  if (book.id) {
    return 'Succefully create book'
  } else return 'Failed to create book'
}

async function deleteBook(bookName: string): Promise<string> {
  const bookId = await prisma.book.findFirst({
    where: {
      name: bookName,
    },
  })
  if (bookId != undefined) {
    const book: Book = await prisma.book.delete({
      where: {
        id: bookId?.id,
      },
    })

    if (book.id) {
      const bookPath = path.resolve(
        `src/books/${book.listName}/${book.fullName}`,
      )
      fs.rmSync(bookPath)
      const bookImgPath = path.resolve(
        `src/books/imgs/${book.listName}/${book.name}.webp`,
      )
      fs.rmSync(bookImgPath)
      return `Delete book  ${book.name}`
    } else return 'Failed to delete book'
  } else return 'Failed to delete book'
}

export default {
  getBooksByList,
  uploadBooksInList,
  uploadBooksImgInList,
  createBooksInList,
  deleteBook,
} as const
