export const sendNoDocumentError = (res) => {
    res.status(422).json({message: 'No document exists, please try a different request'})
}