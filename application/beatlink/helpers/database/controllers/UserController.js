// helpers/database/controllers/userController.js
import signale from 'signale'
import { connect } from '../database.js'
import { User } from '../models/user.js'

export const findUser = async (username) => {
  try {
    await connect()
    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('No user found with this username')
    }

    return user
  } catch (error) {
    signale.error('Authentication Error:', error)
    throw error
  }
}

export const findUserById = async (userId) => {
  try {
    await connect()
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('No user found with this userId')
    }

    return user
  } catch (error) {
    signale.error('Authentication Error:', error)
    throw error
  }
}

export const createUser = async (userObject) => {
  try {
    await connect()

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: userObject.username }, { email: userObject.email }],
    })

    // If an existing user is found, throw an error
    if (existingUser) {
      const errorField =
        existingUser.username === userObject.username ? 'Username' : 'Email'
      throw new Error(`${errorField} already exists`)
    }

    // Proceed with creating the new user if no duplicates are found
    const newUser = new User({
      email: userObject.email,
      username: userObject.username,
      password: userObject.password,
      birthday: userObject.birthday,
      userImage: '',
    })

    await newUser.save()
    signale.success('User Created')
  } catch (error) {
    signale.error('Error Creating User:', error)
    throw error
  }
}

export const updateUser = async (userid, updates) => {
  try {
    await connect()

    const user = await User.findById(userid)
    if (!user) {
      throw new Error('No user found with this userid')
    }

    if (updates.bio !== undefined) {
      user.bio = updates.bio
    }
    if (updates.status !== undefined) {
      user.status = updates.status
    }

    await user.save()
    signale.success('User updated successfully')
    return user
  } catch (error) {
    signale.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    await connect()

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('No user found with this userId')
    }

    await User.deleteOne({ _id: userId })
    signale.success('User deleted successfully')

    return { message: 'User deleted successfully' }
  } catch (error) {
    signale.error('Error deleting user:', error)
    throw error
  }
}

export const updateUserImage = async (userid, updates) => {
  try {
    await connect()
    const user = await User.findById(userid)
    if (!user) {
      throw new Error('No user found with this userid')
    }

    if (updates.userImage !== undefined) {
      user.userImage = updates.userImage
    }

    await user.save()
    signale.success('User updated successfully')
    return user
  } catch (error) {
    signale.error('Error updating user:', error)
    throw error
  }
}

export const followUser = async (fromUser, followUserId) => {
  try {
    await connect()

    const alreadyFollowing = fromUser.following.includes(followUserId)

    if (alreadyFollowing) {
      throw new Error('Already following user!')
    }

    // Add a following user for logged in user
    const following = fromUser.following
    following.push(followUserId)
    await fromUser.save()
    signale.success(`Followed ${followUserId} from ${fromUser._id} `)

    // Add a follower for the viewed user
    await addFollower(fromUser, followUserId)
  } catch (error) {
    signale.error('Error following user:', error)
    throw error
  }
}

export const unfollowUser = async (fromUser, followUserId) => {
  try {
    await connect()

    const isFollowing = await doesFollowUser(fromUser, followUserId)

    if (!isFollowing) {
      throw new Error("Can't unfollow a user you don't follow!")
    }

    // Remove following from logged in user
    const newFollowing = fromUser.following.filter(
      (userId) => userId !== followUserId,
    )
    fromUser.following = newFollowing
    await fromUser.save()

    await removeFollower(fromUser, followUserId)
  } catch (error) {
    signale.error('Error unfollowing user:', error)
    throw error
  }
}

export const doesFollowUser = async (fromUser, followUserId) => {
  try {
    await connect()

    const isFollowing = fromUser.following.includes(followUserId)

    return isFollowing
  } catch (error) {
    signale.error('Error checking if user follows specific user:', error)
    throw error
  }
}

const addFollower = async (fromUser, followUserId) => {
  try {
    await connect()

    const toUser = await findUserById(followUserId)

    const followers = toUser.followers
    followers.push(fromUser._id.valueOf())
    await toUser.save()
    signale.success(`Added follower: ${fromUser._id} for ${followUserId}`)
  } catch (error) {
    signale.error('Error adding follower:', error)
    throw error
  }
}

const removeFollower = async (fromUser, followUserId) => {
  try {
    await connect()

    const toUser = await findUserById(followUserId)

    const newFollowers = toUser.followers.filter(
      (item) => item !== fromUser._id.valueOf(),
    )

    toUser.followers = newFollowers
    await toUser.save()
    signale.success(`Removed follower: ${fromUser._id} for ${followUserId}`)
  } catch (error) {
    signale.error('Error removing follower:', error)
    throw error
  }
}

