import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/login', // 添加这一行来重定向根路径到 /login
		},
		{
			path: '/app',
			name: 'app',
			component: () => import('../views/app/AppView.vue'),
			children: [
				{
					path: '',
					name: 'base',
					component: () => import('../views/app/BaseView.vue'),
				},
				{
					path: 'home',
					name: 'home',
					component: () => import('../views/HomeView.vue'),
				},
				{
					path: 'exam',
					name: 'exam',
					component: () => import('../views/ExamView.vue'),
				},
				{
					path: 'about',
					name: 'about',
					component: () => import('@/views/AboutView.vue'),
				},
				{
					path: 'main',
					name: 'main',
					component: () => import('../views/MainView.vue'),
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/main',
			name: 'main',
			component: () => import('../views/MainView.vue'),
		},
	],
})

export default router
