import Vue from 'vue'
import Router from 'vue-router'
import Error404 from '@/views/error/Error404'
import Layout from '@/views/layout/Layout'

import NewMain from '@/views/new/Main'

import BlogMain from '@/views/blog/Main'
import BlogEdit from '@/views/blog/Edit'
import BlogDetails from '@/views/blog/Details'
import Home from '@/views/Home'
import Test from '@/views/Test'

Vue.use(Router)

export const constantRouterMap =  [
    
    {
        path: '/user/new',
        redirect:'/user/new/main',
        component:Layout,
        meta:{
            type:"user",
            icon:'el-icon-star-off',
            title:'最新动态'
        },
        children: [
            {
                path: 'main',
                component: NewMain
            }
        ]
    },
    {
        path: '/user/blog',
        redirect:'/user/blog/main',
        component:Layout,
        meta:{
            type:"user",
            icon:'el-icon-edit-outline',
            title:'博客列表'
        },
        children: [
            {
                path: 'main',
                component: BlogMain
            },
            {
                path: 'edit',
                component: BlogEdit
            },
            {
                path: 'details/:id',
                component: BlogDetails
            }
        ]
    },
    {
        path: '/user/readme',
        redirect:'/user/readme/main',
        component:Layout,
        meta:{
            type:"user",
            icon:'el-icon-document',
            title:'README.md'
        },
        children: [
            {
                path: 'main',
                component: Test
            }
        ]
    },
    {
        path: '/user/license',
        redirect:'/user/license/main',
        component:Layout,
        meta:{
            type:"user",
            icon:'el-icon-setting',
            title:'License'
        },
        children: [
            {
                path: 'main',
                component: Home
            }
        ]
    },
           


    {
        path: "/404",
        component: Error404
    },
    {
        path: '/',
        redirect:'/user/new',
    },
    { 
        path: "*", 
        redirect: "/404"
    }
]

export default new Router({
  routes: constantRouterMap
})
