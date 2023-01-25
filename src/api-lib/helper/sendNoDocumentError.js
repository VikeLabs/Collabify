/** @deprecated */
export const sendNoDocumentError = (res, error) => {
  if (error) {
    console.log(error);
  }

  res.status(404).json({
    message: 'No document exists, please try a different request',
  });
};
