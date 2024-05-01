import {
  findUserById,
  followUser,
  unfollowUser,
  doesFollowUser,
} from '../../../../helpers/database/controllers/UserController'

export async function POST(req) {
  try {
    const { userId, followId } = await req.json()

    const fromUser = await findUserById(userId)

    const isFollowing = await doesFollowUser(fromUser, followId)

    if (isFollowing) {
      await unfollowUser(fromUser, followId)

      return Response.json({ message: 'Unfollowed User!' })
    }
    await followUser(fromUser, followId)

    return Response.json({ message: 'Followed User!' })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
