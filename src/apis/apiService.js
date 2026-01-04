// apiService.js (API 호출 로직)
import { API_BASE_URL } from '../constants/constants';

const logYn = false;

// 범용 SP 호출 : asp*
const asp = async args => {
  const funcName = '■■ asp ::: ';
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0];
  if (logYn || true)
    console.log(funcName + '=========================== ' + date + ' ' + time);

  if (logYn || true) console.log(funcName + 'args: ' + JSON.stringify(args));
  try {
    console.log(funcName + API_BASE_URL + '/asp');
    const response = await fetch(API_BASE_URL + '/asp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 서버가 업데이트된 객체를 반환한다고 가정
    const result = await response.json();
    if (logYn || true)
      console.log(funcName + 'result: ' + JSON.stringify(result));
    return result;
  } catch (error) {
    if (logYn) console.error(funcName + 'Item Error: ', error);
    throw error;
  }
};

export { asp };
