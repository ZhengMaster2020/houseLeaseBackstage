<template>
  <el-container style="height: 100vh;">
    <!-- 头部信息 -->
      <el-header style="text-align: right; font-size: 12px" class="header-bar">
        <span class="title">房屋租赁系统后台管理系统</span>
        <div class="wrap">
          <div class="demo-image__preview">
            <el-image
              class="user-avatar" 
              style="width: 40px; height: 40px"
              :src="userInfo.avatarUrl ? userInfo.avatarUrl : imgUrl" 
              :preview-src-list="userInfo.avatarUrl ? [userInfo.avatarUrl] : [imgUrl]">
            </el-image>
          </div>
          <span class="username">{{ userInfo.username }}</span>
          <el-dropdown @command="handleCommand" class="dropdrown">
          <span><i class="el-icon-setting" style="margin-right: 15px"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="view">查看</el-dropdown-item>
              <el-dropdown-item command="add">新增</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
              <el-dropdown-item command='exit'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="[]" unique-opened :default-active="$route.path">

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-house"></i>房屋管理
            </template>
            <el-menu-item-group>
              <template slot="title">房屋类型</template>
              <el-menu-item index="/add/create">新建房屋类型</el-menu-item>
              <el-menu-item index="/add/list">房屋类型列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">房屋</template>
              <el-menu-item index="/houses/create">新建房屋</el-menu-item>
              <el-menu-item index="/houses/list">房屋列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-comment"></i>评论管理
            </template>
            <el-menu-item-group>
              <template slot="title">评论</template>
              <el-menu-item index="/ads/create">新建评论</el-menu-item>
              <el-menu-item index="/ads/list">评论列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>用户管理
            </template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/users/create">新建用户</el-menu-item>
              <el-menu-item index="/users/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4" v-if="userInfo.userType !== '租客'">
            <template slot="title">
              <i class="el-icon-s-tools"></i>系统设置
            </template>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧详细内容展示区 -->
      <el-main>
        <div class="bg-wrap" v-if="false">
          <div class="welcome">
            <span class="text1">欢迎</span>
            <span class="text2">登录</span>
            <span class="icon">
              <i class=" right el-icon-d-arrow-right"></i>
              <i class=" right el-icon-d-arrow-right"></i>
              <i class=" right el-icon-d-arrow-right"></i>
            </span>
          </div>
          <div class="title">
            ——房屋租赁管理系统
          </div>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: '',
      imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 登录用户头像默认地址
      previewImgUrl: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'], // 头像预览图片默认地址
    };
  },
  created() {
    // 页面加载的时候从sessionStorage获取初始化数据
    this.userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
    const token = sessionStorage.getItem('token')
    token && (this.show = false)
  },
  methods: {
    // 根据不同的command 处理点击事件
    handleCommand(command) {
      console.log('command', command)
      switch (command) {
        case 'view':
          this.$router.push('/admin_users/list')
          break;
        case 'add':
          this.$router.push('/admin_users/create') 
          break;
        case 'delete':
          this.$router.push('/admin_users/list')
          break;
          case 'exit': // 退出系统
            this.$router.push('/login')
            sessionStorage.removeItem('userinfo')
            sessionStorage.removeItem('token')
            break;
      }

    }
  }
};
</script>

<style scoped>
.bg-wrap {
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
  background: olive url(../assets/mian-bg.jpg) no-repeat;
  background-size: 100% 100%;
  width: 50%;
  height: 50%;
  /* border-radius: 5px 350px; */
  transform: rotate(10deg);
  overflow: hidden;
  box-shadow: -20px 10px 30px  #b3c0d1;
}
.bg-wrap .title {
  margin-left: 10px;
  font-size: 18px;
}
.bg-wrap .welcome {
  margin: 50px 0 10px 50px;
}
.bg-wrap .welcome .text1,.icon {
  color: #000;
  font-size: 14px;
}
.bg-wrap .welcome .text2 {
  color: #999;
  font-weight: bold;
  font-size: 20px;
  margin: 0 10px;
}
.title {
  font-size: 18px;
}
.username {
  margin-right: 10px;
}
.el-icon-setting {
  font-size: 16px;
  cursor: pointer;
}
.demo-image__preview {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrap {
  display: flex;

}
.dropdrown {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-avatar {
  border-radius: 50%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
