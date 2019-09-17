<template>
  <div class="he">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider collapsible v-model="collapsed">
        <div class="logo">后台管理系统</div>
        <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="pie-chart" />
              <span>商品管理</span>
            </span>
            <a-menu-item
              v-for="(item,index) in list"
              :key="index"
              @click="goto(item.urlList)"
            >{{item.name}}</a-menu-item>
            <!-- <a-menu-item key="4">商品分类</a-menu-item>
            <a-menu-item key="5">添加商品</a-menu-item>-->
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="team" />
              <span>用户管理</span>
            </span>
            <a-menu-item key="6">用户列表</a-menu-item>
            <a-menu-item key="8">添加用户</a-menu-item>
          </a-sub-menu>
          <!--  -->
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="bars" />
              <span>订单管理</span>
            </span>
            <a-menu-item key="7">订单列表</a-menu-item>
          </a-sub-menu>
          <!--  -->
          <a-menu-item key="9">
            <a-icon type="file" />
            <span>File</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" />
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

export default {
  data() {
    return {
      collapsed: false,
      list: [
        {
          key: "1",
          name: "商品列表",
          urlList: "/home/list"
        },
        {
          key: "2",
          name: "商品分类",
          urlList: "/home/classlist"
        }
      ]
    };
  },
  methods: {
    goto(name) {
      this.$router.push({
        path: name
      });
    }
  }
};
</script>


<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 32px;
  font-weight: 500;
}
</style>
