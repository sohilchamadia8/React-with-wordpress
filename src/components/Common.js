export const isUserLoggedIn = () => {
    return (
        localStorage.getItem('token')
    )
}


export const getUserName = () => {
    return (
        localStorage.getItem('user_name')
    )
}

export const getUserEmail = () => {
    return (
        localStorage.getItem('user_email')
    )
}