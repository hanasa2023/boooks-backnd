/**
 * Express router paths go here.
 */

export default {
  Base: '/v1',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Lists: {
    Base: '/lists',
    Get: '/all',
    Create: '/create',
    Delete: '/delete',
    Update: '/update',
  },
  Books: {
    Base: '/books',
    Get: '/get',
    Create: '/create',
    Delete: '/delete',
    UploadImg: '/uploadImg',
  },
} as const
