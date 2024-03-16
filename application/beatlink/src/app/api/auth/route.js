export async function route({username, password}) {
    // const response = await fetch(' ', { // data point from database
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(credentials), // username and password info
    // })

    // if (response.ok) {
    //     return response.json() // { success: true }
    // } else {
    //     throw new Error('Failed to sign in') // { success: true }
    // }

    if (username == 'user' && password == 'user') {
        return { success: true }
    }
    else {
        return { success: false }
        console.log('Invalid login credentials. Please try again.')
    }
}