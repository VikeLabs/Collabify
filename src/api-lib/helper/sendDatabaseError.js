export const sendDatabaseError = (res) => {
    res.status(500).json({message: 'An issue occurred with the database entry, please try again!'})
}