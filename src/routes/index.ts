import { Router } from 'express'

import Paths from '../common/Paths'
import UserRoutes from './UserRoutes'
import ListRoutes from './ListRoutes'
import BookRoutes from './BookRoutes'

// **** Variables **** //

const apiRouter = Router()

// ** Add UserRouter ** //

// Init router
const userRouter = Router()
const listRouter = Router()
const bookRouter = Router()

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll)
userRouter.post(Paths.Users.Add, UserRoutes.add)
userRouter.put(Paths.Users.Update, UserRoutes.update)
userRouter.delete(Paths.Users.Delete, UserRoutes.delete)

// Get all lists
listRouter.post(Paths.Lists.Get, ListRoutes.getAllList)
listRouter.post(Paths.Lists.Create, ListRoutes.createList)
listRouter.post(Paths.Lists.Delete, ListRoutes.deleteList)
listRouter.post(Paths.Lists.Update, ListRoutes.updateList)

// Get books by list
bookRouter.post(Paths.Books.Get, BookRoutes.getBooksByList)
bookRouter.post(Paths.Books.Create, BookRoutes.createBookInList)
bookRouter.post(Paths.Books.Delete, BookRoutes.deleteBook)

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Lists.Base, listRouter)
apiRouter.use(Paths.Books.Base, bookRouter)

// **** Export default **** //

export default apiRouter
