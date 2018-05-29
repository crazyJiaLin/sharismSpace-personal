<template>
    <div :class="showUserInfo ? 'user-blog-router-wrapper show-user-info' : 'user-blog-router-wrapper'">
        <div class="user-blog-left-wrapper">
            <div class="blog-wrapper">
                <div class="blog-title">{{blogInfo.blogTitle}}</div>
                <div class="blog-info">
                    <div class="blog-info-left-wrapper fl">
                        <span class="blog-nature">{{natureFilter}}</span>
                        <span class="blog-classify">{{blogInfo.classify}}</span>
                        <span class="blog-blogType">{{blogInfo.blogType}}</span>
                    </div>
                    <div class="blog-info-right-wrapper fr">
                        <span><i class="fa fa-eye"></i> {{blogInfo.readCount}}</span>
                        <span @click.stop="clickThumbsUp" :class="isLike?'thumbs-up-blog like-blog':'thumbs-up-blog'">
                            <i :class="isLike?'fa fa-thumbs-up':'fa fa-thumbs-o-up'"></i> {{blogInfo.praiseAmount}}
                        </span>
                        <span><i class="fa fa fa-share-square-o"></i> {{blogInfo.transpondAmount}}</span>
                        <span class="publish-date">{{blogInfo.publishDate}}</span>
                    </div>
                </div>
            </div>
            <div class="blog-content-wrapper" v-html="blogInfo.blog"></div>
        </div>
        <div class="user-blog-right-wrapper">
            <div class="user-blog-info-wrapper">
                <div class="user-blog-info">
                    <div class="user-portrait-wrapper">
                        <div class="user-info-wrapper">
                            <div class="portrait-line line-top"></div>
                            <div class="portrait-line line-right"></div>
                            <div class="portrait-line line-bottom"></div>
                            <div class="portrait-line line-left"></div>
                            <div class="user-info user-nickname">{{blogUserInfo.userName}}</div>
                            <div class="user-info mail">{{blogUserInfo.mail}}</div>
                            <div class="user-info">
                                <div class="user-info-item user-age">{{blogUserInfo.userAge}}</div>
                                <div class="user-info-item user-sex" v-html="userSexIcon"></div>
                                <div class="user-info-item constellation">{{blogUserInfo.constellation}}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="blog-info-wrapper">
                        <div class="blog-user-info">
                            <div class="blog-info-label">原创</div>
                            <div class="blog-info-number">{{blogUserInfo.blogOriginal}}</div>
                        </div>
                        <div class="blog-user-info">
                            <div class="blog-info-label">转载</div>
                            <div class="blog-info-number">{{blogUserInfo.blogTransshipment}}</div>
                        </div>
                        <div class="blog-user-info">
                            <div class="blog-info-label">翻译</div>
                            <div class="blog-info-number">{{blogUserInfo.blogTranslate}}</div>
                        </div>
                    </div>
                    <div class="blog-info-wrapper">
                        <div class="blog-user-info">
                            <div class="blog-info-label">照片</div>
                            <div class="blog-info-number">{{blogUserInfo.photoCount}}</div>
                        </div>
                        <div class="blog-user-info">
                            <div class="blog-info-label">积分</div>
                            <div class="blog-info-number">{{blogUserInfo.userScore}}</div>
                        </div>
                        <div class="blog-user-info">
                            <div class="blog-info-label">专业</div>
                            <div class="blog-info-number">{{blogUserInfo.major}}</div>
                        </div>
                    </div>
                    <div class="user-description-wrapper">
                        <div class="user-description-label fl">兴趣爱好 :</div>
                        <div class="user-description fl">{{blogUserInfo.hobbies}}</div>
                    </div>
                    <div class="user-description-wrapper">
                        <div class="user-description-label fl">个性签名 :</div>
                        <div class="user-description fl">{{blogUserInfo.signature}}</div>
                    </div>
                </div>
                
                <div @click.stop="showUserInfo = !showUserInfo" class="hide-user-info-btn">
                    <i :class="showUserInfo ? 'fa fa-angle-double-right' : 'fa fa-angle-double-left' "></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './blog-detail.css'
    
    export default{
        computed : {
            blogId(){
                return this.$route.params.id
            },
            natureFilter(){
                return this.blogInfo.nature.slice(0,1);
            },
            userSexIcon(){
               return this.blogUserInfo.userSex == '女' ? '<i class="fa fa-venus"></i>' : '<i class="fa fa-mars"></i>';
            },
            blogUserInfo(){
                return this.$store.state.userInfo;
            }
        },
        data(){
            return {
                showUserInfo:true,
                isLike : false,
                blogLikeId : '',
                blogInfo : {
                    blogTitle : '博客标题',
                    nature : '原创',
                    classify : '一级分类',
                    blogType : '二级分类',
                    readCount : 0,
                    praiseAmount : 0,
                    transpondAmount : 0,
                    publishDate : 'yyyy-mm-dd HH:MM:SS',
                    blog : '博客内容'
                },
            }
        },
        methods : {
            clickThumbsUp(){   //博客点赞
                if(this.isLike){
                    this.deleteBlogLike();
                }else{
                    this.insertBlogLike();
                }
            },
            deleteBlogLike(){
                let that = this;
                var blogId = that.blogInfo.id;
                var formData=new FormData();
                formData.append("blogId",blogId);
                this.$axios({
                    method : 'post',
                    url: window.blogReqUrl + "/bloglike/deleteBlogLike",
                    data : formData,
                })
                .then(function (response) {
                    let data = response.data;
                    console.log(data);
                    if(data.code == 1){
                        that.isLike = false;
                        that.blogLikeId = data.value;
                        that.blogInfo.praiseAmount--;
                    }else{
                        that.$message.error(data.message);
                    }
                })
                .catch(function (error) {
                    that.$message.error("服务器开小差了~稍后重试 ^8^");
                });
                
            },
            insertBlogLike(){
                let that = this;
                let userInfo = that.$store.state.userInfo;
                var map = {
                    //用户id	
                    "userId" : userInfo.id,
                    //用户昵称
                    "userNickname": userInfo.userNickname,
                    //用户头像
                    "iconPath": userInfo.iconPath,
                    //作者id
                    "authorId": that.blogInfo.userId,
                    //博客id
                    "blogId": that.blogInfo.id	
                };		
                var formData=new FormData();
                formData.append("blogLikeMap",JSON.stringify(map));
                this.$axios({
                    method : 'post',
                    url: window.blogReqUrl + "/bloglike/insertBlogLike",
                    data : formData,
                })
                .then(function (response) {
                    let data = response.data;
                    // console.log(data);
                    if(data.code == 1){
                        that.isLike = true;
                        that.blogLikeId = data.value;
                        that.blogInfo.praiseAmount++;
                    }else{
                        that.$message.error(data.message);
                    }
                })
                .catch(function (error) {
                    that.$message.error("服务器开小差了~稍后重试 ^8^");
                });
            },
            checkBlogLike(){
                let that = this;
                let map = {
                    //用户id	
                    "userId" :  that.$store.state.userInfo.id,
                    //博客id
                    "blogId": 	that.blogId
                };		
                console.log(map);
                var formData=new FormData();
                formData.append("blogLikeMap",JSON.stringify(map));
                this.$axios({
                    method : 'post',
                    url: window.blogReqUrl + "/bloglike/checkBlogLikeByUserId",
                    data : formData,
                })
                .then(function (response) {
                    let data = response.data;
                    console.log(data);
                    if(data.code == 1){
                        that.isLike = true;
                    }
                })
                .catch(function (error) {
                    that.$message.error("服务器开小差了~稍后重试 ^8^");
                });
            },
            getBlog(){      //通过id获取博客信息
                let that = this;
                var id = that.blogId;		
                var formData = new FormData();
                formData.append("blogId",id);
                this.$axios({
                    method : 'post',
                    url: window.blogReqUrl + "/blog/selectBlogById",
                    data : formData,
                })
                .then(function (response) {
                    let data = response.data;
                    console.log(data.value);
                    if(data.code == 1){
                        that.blogInfo = data.value;
                        that.checkBlogLike();   //博客查询完成之后，根据博客id查询本用户是否被点击
                    }else{
                        that.$message.error(data.message);
                    }
                })
                .catch(function (error) {
                    that.$message.error("服务器开小差了~稍后重试 ^8^");
                });
            }
        },
        
        mounted(){
            // console.log(this.blogId);
            this.getBlog();
            
        }
    }
</script>

