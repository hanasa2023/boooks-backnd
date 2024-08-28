import ListService from '@src/services/ListService'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { List } from '@prisma/client'
import { IReq, IRes } from './types/express/misc'

async function getAllList(_: IReq, res: IRes) {
  const lists: List[] = await ListService.getAllList()
  return res.status(HttpStatusCodes.OK).json(lists)
}

async function createList(req: IReq<{ listName: string }>, res: IRes) {
  const { listName } = req.body
  const r = await ListService.createList(listName)

  return res.status(HttpStatusCodes.OK).json({ code: 200, msg: r })
}

async function deleteList(req: IReq<{ listName: string }>, res: IRes) {
  const { listName } = req.body
  const r = await ListService.deleteList(listName)

  return res.status(HttpStatusCodes.OK).json({ code: 200, msg: r })
}

async function updateList(
  req: IReq<{ oldName: string; newName: string }>,
  res: IRes,
) {
  const { oldName, newName } = req.body
  const r = await ListService.updateList(oldName, newName)

  return res.status(HttpStatusCodes.OK).json({ code: 200, msg: r })
}

export default {
  getAllList,
  createList,
  deleteList,
  updateList,
} as const
