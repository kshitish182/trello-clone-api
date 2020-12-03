export const loginService = (data: any) => {
  if (data.username) {
    return 'Successful';
  } else {
    return 'failure';
  }
};

export const registerService = (data: any) => {
  if (data.username) {
    return 'Registerd';
  } else {
    return 'Failure';
  }
};
