export default function ApiErrorHandler(error: any, defaultMessage: string = "An unexpected error occurred."): Error {
  if (error.response) {
    // Server responded with an error status code
    const errorMessage = error.response.data?.message || defaultMessage;
    return new Error(errorMessage);
  } else if (error.request) {
    // Request was made but no response was received
    return new Error("Network error. Please try again.");
  } else {
    // Something happened in setting up the request that triggered an Error
    return new Error(defaultMessage);
  }
}
