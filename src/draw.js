/**
 *
 * 自动抽奖
 *
 *  */

const fetch = require('node-fetch');
const { headers,UUID,MS_TOKEN,A_BOGUS } = require('./config');

async function draw() {
  // 查询今日是否有免费抽奖机会
  const today = await fetch('https://api.juejin.cn/growth_api/v1/lottery_config/get?aid=2608&uuid=${UUID}&spider=0&msToken=${MS_TOKEN}&a_bogus=${A_BOGUS}', {
    headers,
    method: 'GET',
    credentials: 'include'
  }).then((res) => res.json());

  if (today.err_no !== 0) return Promise.reject('查询免费抽奖，接口调用异常！');
  if (today.data.free_count === 0) return '今日已经免费抽奖！';

  // 免费抽奖
  const res = await fetch('https://api.juejin.cn/growth_api/v1/lottery/draw?aid=2608&uuid=${UUID}&spider=0&msToken=${MS_TOKEN}$a_bogus=${A_BOGUS}', {
    headers,
    method: 'POST',
    credentials: 'include'
  }).then((res) => res.json());

  if (res.err_no !== 0) return Promise.reject('免费抽奖异常，接口调用异常！');

  return res.data.lottery_name;
}

module.exports = draw;
