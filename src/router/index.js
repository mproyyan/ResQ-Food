import { createRouter, createWebHistory } from "vue-router"
import RequestProduct from '@/views/seller/RequestProduct.vue'

const routes = [
    {
        path: '/request',
        name: 'SellerRequest',
        component: RequestProduct
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router