const domain = 'http://139.199.192.48:8888';
export default {
    domain:domain,
    // 新闻路由
    newsList : domain + '/api/getnewslist',
    newsDetails: domain + '/api/getnew/',
    // 评论路由
    commentPut:domain + '/api/postcomment/',
    commentList:domain + '/api/getcomments/'
};