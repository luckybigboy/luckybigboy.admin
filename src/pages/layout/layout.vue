<template>
  <div class="layout">
    <div class="leftNav"
         :style="{width: this.isCollapsed?'64px':'200px'}">
      <div class="logo-wrapper">
        logo
      </div>
      <el-menu background-color="#424f63"
               text-color="#fff"
               active-text-color="#65cea7"
               class="menu-wrapper"
               router
               unique-opened
               :collapse="isCollapsed"
               :default-active="$route.path">
        <template v-for="(item, index) in sideBarArr">
          <el-menu-item class="menu-item"
                        v-if="!item.children"
                        :index="item.path"
                        :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else
                      :key="index"
                      :index="item.path">
            <template slot="title"
                      class="childItem">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item class="menu-item"
                          v-for="(sub_item, sub_index) in item.children"
                          :index="sub_item.path"
                          :key="sub_index">
              <span slot="title"
                    style="margin-left:12px;">{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="topBar clearfix"
         :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="menu-collapse-wrapper float-left"
           @click="toggleMenu">
        <i class="el-icon-s-fold large-size"
           :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"></i>
      </div>
      <div class="title float-left">后台管理系统</div>
      <ul class="menu-list float-right">
        <li v-if="user"
            class="menu-item"
            style="padding: 0;">
          <el-dropdown :show-timeout="10"
                       :hide-timeout="10"
                       @command="handleCommand"
                       style="padding: 0 15px;">
            <div class="dropdown-content el-dropdown-link">
              <i class="el-icon-user-solid"></i>
              <span class="text">{{user.name || user.username}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{user.username}}</el-dropdown-item>
              <el-dropdown-item command="b">{{user.name}}</el-dropdown-item>
              <el-dropdown-item command="b">{{user.type.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="menu-item">
          <i class="el-icon-question"></i>
        </li>
        <li class="menu-item"
            @click="exit">
          <i class="el-icon-switch-button"></i>
        </li>
      </ul>
    </div>
    <div class="content-wrapper"
         ref="content-wrapper"
         :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      isCollapsed: false,
      sideBarArr: [
        {
          path: '/home',
          title: '首页',
          icon: 'iconfont icon-xuanzhongshangcheng'
        },
        {
          path: '/tables',
          title: '表格管理',
          icon: 'iconfont icon-biaoge',
          children: [
            {
              path: '/tables/basic',
              title: '基本表格'
            },
            {
              path: '/tables/sort',
              title: '排序表格'
            },
            {
              path: '/tables/filter',
              title: '筛选表格'
            }
          ]
        },
        {
          path: '/charts',
          title: '图标管理',
          icon: 'iconfont icon-tubiao',
          children: [
            {
              path: '/charts/bar',
              title: '柱状图'
            },
            {
              path: '/charts/line',
              title: '折线图'
            },
            {
              path: '/charts/pie',
              title: '饼图'
            }
          ]
        },
        {
          path: '/users',
          title: '用户管理',
          icon: 'el-icon-user-solid'
        },
        {
          path: '/optionsNews',
          title: '操作日志',
          icon: 'el-icon-date'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapsed = !this.isCollapsed;
    },
    checkAuth () {
      let token = this.$store.state.token || sessionStorage.getItem('token');
      if (token && token.length === 2) {
        this.$router.replace('/login')
      }
      else {
        this.getUser();
      }

    },
    getUser () {
      let User = {
        id: '7f859967-9b12-441c-badc-8a7d312f6da4',
        username: 'admin',
        name: 'luckybigboy',
        type: {
          code: 0,
          name: '超级管理员'
        }
      };
      this.$store.commit('set_user', User);
    },
    // 退出
    exit () {
      this.$confirm('即将退出系统登陆，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SAVE_TOKEN', '')
        this.$store.commit('set_user', null)
        this.$router.replace('/login')
      }).catch(err => {
        return false;
      })
    },
    handleCommand (command) {
      console.log(command);
    },
  },
  created () {
    this.checkAuth();
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/variable.scss";
.layout {
  .leftNav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: $slideBgColor;
    width: $siderbarWidth;
    transition: all 0.3s ease-in-out;
    .logo-wrapper {
      height: 40px;
      line-height: 40px;
      padding: 16px 0;
      text-align: center;
      font-size: 24px;
      color: #ffffff;
      color: $chooseSlideColor;
    }
    .menu-wrapper {
      border-right: none;
      &:not(.el-menu--collapse) {
        overflow-y: auto;
        overflow-x: hidden;
      }
      i {
        font-size: 20px;
      }
    }
    .menu-item,
    .el-submenu__title {
      &:hover {
        i,
        span {
          color: $chooseSlideColor;
        }
      }
    }
  }
  // 顶部导航
  .topBar {
    position: fixed;
    left: $siderbarWidth;
    top: 0;
    right: 0;
    height: $topbarHeight;
    background: #fff;
    padding: 0 24px 0 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease-in-out;
    z-index: 10;
    .menu-collapse-wrapper {
      height: 100%;
      width: 48px;
      line-height: 48px;
      text-align: center;
      cursor: pointer;

      i {
        transition: all 0.3s ease-in-out;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .title {
      line-height: 48px;
      font-weight: bold;
      font-size: 20px;
    }
    .menu-list {
      margin: 0;
      padding: 0;
      line-height: 48px;
      .el-icon-user-solid {
        font-size: 24px;
      }
      .menu-item {
        position: relative;
        float: left;
        padding: 0 15px;
        min-width: 45px;
        height: 48px;
        text-align: center;
        font-size: 24px;

        &:hover {
          cursor: pointer;
          background-color: #f5f5f5;
        }

        .icon {
          vertical-align: middle;
          font-size: 24px;
        }

        .text {
          display: inline-block;
          margin-left: 4px;
          font-size: 16px;
        }
      }
    }
  }
  // 底部内容
  .content-wrapper {
    position: fixed;
    left: $siderbarWidth;
    top: $topbarHeight;
    right: 0;
    bottom: 0;
    padding: 16px;
    overflow: auto;
    background: rgb(245, 245, 243);
    transition: all 0.3s ease-in-out;
  }
}
</style>