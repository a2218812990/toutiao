import request from '../utils/intercept.js'
import { ARTICLE_URL, ARTICLE_CHANNELS } from '../consturl/url'
export function getarticle (params) {
  return request({
    url: ARTICLE_URL,
    params
  })
}
export function getchannels () {
  return request({ url: ARTICLE_CHANNELS })
}
