/**
 *
 * 签到
 *
 *  */

const fetch = require('node-fetch');
const { headers,UUID,MS_TOKEN,A_BOGUS } = require('./config');

async function sign_in() {
  // 查询今日是否已经签到
  const today_status = await fetch('https://api.juejin.cn/growth_api/v1/get_today_status', {
    headers,
    method: 'GET',
    credentials: 'include'
  }).then((res) => res.json());
  console.log(today_status)
  if (today_status.err_no !== 0) return Promise.reject('签到失败！');
  if (today_status.data) return '今日已经签到！';

  // 签到
  const response = await fetch('https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uuid=${UUID}&spider=0&msToken=${MS_TOKEN}$a_bogus=${A_BOGUS}',{
     headers,
    method: 'POST'
    //credentials: 'include'
  })
  console.log(response);
  if (!response.ok) {
      const errorText = await response.text(); // 读取响应文本
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
  const res = await response.json();
  if (res.err_no !== 0) return Promise.reject('签到异常！');
  return `签到成功！`;
}

module.exports = sign_in;
