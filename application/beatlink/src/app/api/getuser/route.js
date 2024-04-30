import { findUserById } from '../../../../helpers/database/controllers/UserController'

export async function POST (req) {
  try {
    const userId = await req.json()
    const user = await findUserById(userId.userId)
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 400 })
    }

    return Response.json(user)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
