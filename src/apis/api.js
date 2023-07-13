const API_END_POINT = 'https://kdt-frontend.cat-api.programmers.co.kr';

export async function request(url) {
  try {
    const result = await fetch(`${API_END_POINT}${url}`);

    if (!result.ok) throw new error('api 요청에 실패하셨습니다');
    return result.json();
  } catch (error) {
    alert(error.message);
  }
}
