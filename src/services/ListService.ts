import { List, Book } from '@prisma/client'
import { prisma } from './Client'
import fs from 'fs'
import path from 'path'

async function getAllList(): Promise<List[]> {
  return await prisma.list.findMany()
}

async function createList(listName: string): Promise<string> {
  const list: List = await prisma.list.create({
    data: {
      name: listName,
    },
  })

  if (list.id) {
    const listPath = path.resolve(`src/books/${listName}`)
    fs.mkdirSync(listPath)
    const listImgPath = path.resolve(`src/books/imgs/${listName}`)
    fs.mkdirSync(listImgPath)

    return `Create List by name ${list.name}!`
  } else return 'Failed to create list'
}

async function updateList(oldName: string, newName: string): Promise<string> {
  const list: List = await prisma.list.update({
    where: {
      name: oldName,
    },
    data: {
      name: newName,
    },
  })
  if (list.id) return `Update List from name ${oldName} to ${list.name}!`
  else return 'Failed to update list'
}

async function deleteList(listName: string): Promise<string> {
  const list: List = await prisma.list.delete({
    where: {
      name: listName,
    },
  })

  if (list.id) {
    await prisma.book.deleteMany({
      where: {
        listName: listName,
      },
    })

    const listPath: string = `src/books/${list.name}`
    fs.rmSync(listPath, { recursive: true, force: true })
    const listImgPath: string = `src/books/imgs/${list.name}`
    fs.rmSync(listImgPath, { recursive: true, force: true })

    return `Success to delete list by name ${list.name}`
  } else return `Failed to delete list`
}

export default {
  getAllList,
  createList,
  deleteList,
  updateList,
} as const
