import { createRouter, createWebHistory } from "vue-router"
import RequestProduct from '@/views/seller/RequestProduct.vue'
import RequestedProducts from "@/views/seller/RequestedProducts.vue"

const routes = [
    {
        path: '/request',
        name: 'SellerRequest',
        component: RequestProduct
    },
    {
        path: '/requested-products',
        name: 'RequestedProducts',
        component: RequestedProducts
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router