const errorList = {
  UNEXPECTED_ERROR: null,
};
Object.keys(errorList).forEach((key) => {
  errorList[key] = key;
});

export const errorCodes = {
  [errorList.UNEXPECTED_ERROR]: -1,
};

export const errorMessages = {
  [errorList.UNEXPECTED_ERROR]: "Unexpected error",
};

export default {
  messages: errorMessages,
  codes: errorCodes,
};