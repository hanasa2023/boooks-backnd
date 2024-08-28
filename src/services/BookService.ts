import { Book } from '@prisma/client'
import { prisma } from './Client'
import { BookData } from '@src/util/typing'

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

async function createBooksInList(bookData: BookData): Promise<string> {
  const book: Book = await prisma.book.create({
    data: {
      name: bookData.name,
      listName: bookData.listName,
      fullName: bookData.fullName,
    },
  })

  if (book.id) return `Create book in list ${book.listName}`
  else return 'Failed to create book'
}

async function deleteBook(bookName: string): Promise<string> {
  const bookId = await prisma.book.findFirst({
    where: {
      name: bookName,
    },
  })
  const book: Book = await prisma.book.delete({
    where: {
      id: bookId?.id,
    },
  })

  if (book.id) return `Delete book  ${book.name}`
  else return 'Failed to create book'
}

export default {
  getBooksByList,
  createBooksInList,
  deleteBook,
} as const
