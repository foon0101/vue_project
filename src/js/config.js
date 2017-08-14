const domain = 'http://139.199.192.48:8888';
export default {
    imgDomain: 'http://ofv795nmp.bkt.clouddn.com/',
    domain:domain,
    // 新闻路由
    newsList : domain + '/api/getnewslist',
    newsDetails: domain + '/api/getnew/',
    // 评论路由
    commentPut:domain + '/api/postcomment/',
    commentList:domain + '/api/getcomments/',
    // 图片路由
    photoList:domain + '/api/getimages/',  //图片列表
    photoCategoryList: domain + '/api/getimgcategory',  // 图片分类
    photoHums:domain + '/api/getthumimages/',  //缩略图
    photoInfo:domain + '/api/getimageInfo/',  //图片数据详情
};