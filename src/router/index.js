import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/pages/sys/login/login.vue')   // 登录页
        },

        // 认证申请
        {
            path: '/sys/apply',
            name: 'apply',
            component: () => import('@/pages/sys/apply/enterprise/apply.vue')
        },
        {
            path: '/sys/staffApply',
            name: 'staffApply',
            component: () => import(/* webpackChunkName: "staffMy" */ '@/pages/sys/apply/staff/apply.vue'),   // 个人账号申请
        },
        {
            path: '/sys/detail',
            name: 'detail',
            component: () => import('@/pages/sys/apply/enterprise/detail.vue')
        },
        {
            path: '/sys/accountType',
            name: 'accountType',
            component: () => import('@/pages/sys/login/accountType.vue')
        },

        // 茶园工角色
        {
            path: '/staff',
            name: 'staff',
            component: () => import(/* webpackChunkName: "staff" */ '@/pages/staff/index.vue'),   // 茶园工首页
            children: [
                {
                    path: '/staff/home',
                    name: 'staffHome',
                    component: () => import(/* webpackChunkName: "staffHome" */ '@/pages/staff/home/index.vue'),   // 茶园工home页
                },
                {
                    path: '/staff/my',
                    name: 'staffMy',
                    component: () => import(/* webpackChunkName: "staffMy" */ '@/pages/staff/my/index.vue'),   // 茶园工我的页
                },
            ]
        },
        {
            path: '/staff/workOrderManage/list',
            name: 'workOrderList',
            component: () => import(/* webpackChunkName: "workOrderList" */ '@/pages/staff/home/workOrderManage/list.vue')   // 茶园工农事执行页面
        },

        {
            path: '/staff/taeGreen',
            name: 'taeGreen',
            component: () => import(/* webpackChunkName: "taeGreen" */ '@/pages/staff/home/taeGreen/taeGreen.vue')   // 茶园工茶青交易页面
        },
		{
            path: '/staff/addTaeGreen',
            name: 'addTaeGreen',
            component: () => import(/* webpackChunkName: "taeGreen" */ '@/pages/staff/home/taeGreen/addTaeGreen.vue')   // 茶园工添加结算页面
        },
        {  
            path: '/staff/executeConfirm',
            name: 'executeConfirm',
            component: () => import(/* webpackChunkName: "taeGreen" */ '@/pages/staff/home/executeConfirm/executeConfirm.vue')   // 茶园工执行确认页面
        },
        {  
            path: '/staff/complateConfirm',
            name: 'complateConfirm',
            component: () => import(/* webpackChunkName: "taeGreen" */ '@/pages/staff/home/complateConfirm/complateConfirm.vue')   // 茶园工完成确认页面
        },
        {  
            path: '/staff/taeGreenCode',
            name: 'taeGreenCode',
            component: () => import(/* webpackChunkName: "taeGreen" */ '@/pages/staff/home/taeGreen/taeGreenCode.vue')   // 茶园工茶青结算完成页面
        },
        {  
            path: '/staff/packDetail',
            name: 'packDetail',
            component: () => import(/* webpackChunkName: "packDetail" */ '@/pages/staff/home/packDetail/packDetail.vue')   // 包装详情页面
        },

        // 企业角色
        {
            path: '/enterprise',
            name: 'enterprise',
            component: () => import(/* webpackChunkName: "enterprise" */ '@/pages/enterprise/enterprise.vue')   // 企业首页
        },

        {
            path: '/enterprise/workOrderManage/list',
            name: 'workOrderList',
            component: () => import(/* webpackChunkName: "agriculturalList" */ '@/pages/enterprise/app/workOrderManage/list.vue')   // 农事管理
        },
        {
            path: '/enterprise/workOrderManage/add/:type',
            name: 'workOrderAdd',
            component: () => import(/* webpackChunkName: "addAgricultural" */ '@/pages/enterprise/app/workOrderManage/add.vue')   // 新增工单
        },
        
        {
            path: '/enterprise/teaDeal/list',
            name: 'teaDealList',
            component: () => import(/* webpackChunkName: "teaDealList" */ '@/pages/enterprise/app/teaDeal/list.vue')   // 企业茶青交易
        },
        {
            path: '/enterprise/teaDeal/add',
            name: 'addTeaDeal',
            component: () => import(/* webpackChunkName: "addTeaDeal" */ '@/pages/enterprise/app/teaDeal/add.vue')   // 企业添加茶青交易
        },
        {
            path: '/enterprise/teaConfirm/list',
            name: 'teaConfirmList',
            component: () => import(/* webpackChunkName: "teaConfirmList" */ '@/pages/enterprise/app/teaConfirm/list.vue')   // 企业茶园确权
        },
        {
            path: '/enterprise/teaConfirm/add',
            name: 'addTeaConfirm',
            component: () => import(/* webpackChunkName: "addTeaConfirm" */ '@/pages/enterprise/app/teaConfirm/add.vue')   // 企业茶园确权
        },
        {
            path: '/enterprise/author/list',
            name: 'teaAuthorList',
            component: () => import(/* webpackChunkName: "teaAuthorList" */ '@/pages/enterprise/app/author/list.vue')   // 企业授权列表
        },
        {
            path: '/enterprise/author/add',
            name: 'addTeaAuthor',
            component: () => import(/* webpackChunkName: "addTeaAuthor" */ '@/pages/enterprise/app/author/add.vue')   // 新增企业授权
        },
        {
            path: '/enterprise/teaGardenManage/list',
            name: 'teaGardenList',
            component: () => import(/* webpackChunkName: "teaGardenList" */ '@/pages/enterprise/app/teaGardenManage/list.vue')   // 茶园管理
        },
        {
            path: '/enterprise/storageManage/list',
            name: 'storageList',
            component: () => import(/* webpackChunkName: "storageList" */ '@/pages/enterprise/app/storageManage/list.vue')   // 仓储管理
        },
        {
            path: '/enterprise/orderManage/list',
            name: 'orderList',
            component: () => import(/* webpackChunkName: "orderList" */ '@/pages/enterprise/app/orderManage/list.vue')   // 订单管理
        },
        {
            path: '/enterprise/labourService/list',
            name: 'labourServiceList',
            component: () => import(/* webpackChunkName: "labourServiceList" */ '@/pages/enterprise/app/labourService/list.vue')   // 劳务用工
        },
        {
            path: '/enterprise/codeMarket/list',
            name: 'codeMarketList',
            component: () => import(/* webpackChunkName: "codeMarketList" */ '@/pages/enterprise/app/codeMarket/list.vue')   // 码上营销
        },
        {
            path: '/enterprise/userManage/list',
            name: 'userList',
            component: () => import(/* webpackChunkName: "userList" */ '@/pages/enterprise/app/userManage/list.vue')   // 人员管理-列表
        },
        {
            path: '/enterprise/userManage/add/:id?',
            name: 'userAdd',
            component: () => import(/* webpackChunkName: "userList" */ '@/pages/enterprise/app/userManage/add.vue')   // 人员管理-添加|编辑
        },
        {
            path: '/enterprise/userManage/detail/:id',
            name: 'userDetail',
            component: () => import(/* webpackChunkName: "userList" */ '@/pages/enterprise/app/userManage/detail.vue')   // 人员管理-详情
        },
        {
            path: '/enterprise/productionWorkOrder/list',
            name: 'productionWorkOrderList',
            component: () => import(/* webpackChunkName: "productionWorkOrderList" */ '@/pages/enterprise/app/productionWorkOrder/list.vue')   // 生产工单
        },
        {
            path: '/enterprise/realMonitor/list',
            name: 'realMonitorList',
            component: () => import(/* webpackChunkName: "realMonitorList" */ '@/pages/enterprise/app/realMonitor/list.vue')   // 实时监控
        },
        {
            path: '/enterprise/fourSituationWatch/list',
            name: 'fourSituationWatchList',
            component: () => import(/* webpackChunkName: "fourSituationWatchList" */ '@/pages/enterprise/app/fourSituationWatch/list.vue')   // 四情监测
        },
        {
            path: '/enterprise/materialManage/list',
            name: 'materialList',
            component: () => import(/* webpackChunkName: "materialList" */ '@/pages/enterprise/app/materialManage/list.vue')   // 原料管理
        },
        {
            path: '/enterprise/policyStudy/list',
            name: 'policyStudyList',
            component: () => import(/* webpackChunkName: "policyStudyList" */ '@/pages/enterprise/app/policyStudy/list.vue')   // 政策学习
        },
        {
            path: '/enterprise/securityAlarm/list',
            name: 'securityAlarmList',
            component: () => import(/* webpackChunkName: "policyStudyList" */ '@/pages/enterprise/app/securityAlarm/list.vue')   // 窜货预警-列表
        },
        {
            path: '/enterprise/securityAlarm/detail',
            name: 'securityAlarmDetail',
            component: () => import(/* webpackChunkName: "policyStudyList" */ '@/pages/enterprise/app/securityAlarm/detail.vue')   // 窜货预警-详情
        },
        // 政府角色
        {
            path: '/goverment',
            name: 'goverment',
            component: () => import(/* webpackChunkName: "enterprise" */ '@/pages/goverment/index.vue')   // 企业首页
        }
    ]
})
