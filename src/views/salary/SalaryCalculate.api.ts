import { getToken } from '/@/utils/auth';

/**
 * 薪资计算接口
 * @param params
 */
export async function getSalary(yearmonth: string) {
  let token = getToken();

  //将这里的URL替换为你实际的后端地址即可
  const url = `http://localhost:8080/jeecg-boot/salary/getCalculate?yearmonth=${yearmonth}`;
  console.log("Request URL:", url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Access-Token': token,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const text = await response.text();
    console.log("Response text:", text);
    const data = JSON.parse(text);
    console.log("Parsed data:", data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // 继续抛出错误，以便调用者可以处理
  }
}








