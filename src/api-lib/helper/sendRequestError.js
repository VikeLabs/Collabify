export const sendRequestError = (res, error) => {
  // Use this for the request result
  console.error(error);
  res.status(500).json({
    message: 'Could not complete request, Please try again!',
  });
};
