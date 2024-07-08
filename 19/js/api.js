const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

export const getData = () => {
  const data = fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json())
    .catch(() => {
    });
  return data;
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(`${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .catch(() => {
      onFail();
    });
};
