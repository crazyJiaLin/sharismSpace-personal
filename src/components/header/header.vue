<template>
    <div class="header">
        <div class="logo-wrapper"></div>
        <div class="nav-wrapper">
            
        </div>
        <div class="user-center">
            <el-dropdown trigger="click">
                <el-button style="background:rbga(255,255,255,0);">
                    <div class="user-icon"></div>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,key) in userCenter" :key="key">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="search-wrapper">
            <div class="search-input">
                <el-input suffix-icon="el-icon-search" size="small" clearable placeholder="请输入内容" v-model="searchContent" class="input-with-select">
                    <el-select v-model="searchOption" slot="prepend" placeholder="请选择">
                        <el-option v-for="(item,key) in searchSelect" :label="item" :value="key" :key="key"></el-option>
                    </el-select>
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
    import './header.css'
    export default{
        data(){
            return {
                searchContent : '',
                searchOption : 0,
                searchSelect : ['不限','博客管理','相册管理','文件管理','网站收藏'],
                userCenter : ['个人中心','消息','账号设置','反馈','登出']
            }
        },
        methods:{
            goSearch(){
                console.log(this.searchOption);
            },
            
        }
    }
</script>

<style scoped>
    .el-dropdown{
        height: 100%;
    }
    .el-button{
        background: rgba(0, 0, 0, 0);
        border-color:  rgba(0, 0, 0, 0);
    }
 </style>
