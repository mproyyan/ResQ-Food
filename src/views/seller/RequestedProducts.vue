<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/product"

const productStore = useProductStore()
const products = productStore.products

onMounted(async () => {
    await productStore.getProducts()
})
</script>

<template>
    <router-link to="/request" class="btn btn-primary my-3">Request Produk</router-link>
    <div class="row row-gap-3 column-gap-3">
        <div v-for="product in products" class="card col-lg-3 col-md-2 col-sm-1 w-25">
            <img :src="product.images[0].url" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <span v-if="product.status === 'Validasi'" class="badge rounded-pill text-bg-info">{{ product.status
                }}</span>
                <span v-else-if="product.status === 'Diterima'" class="badge rounded-pill text-bg-success">{{ product.status
                }}</span>
                <span v-else-if="product.status === 'Ditolak'" class="badge rounded-pill text-bg-danger">{{ product.status
                }}</span>
            </div>
        </div>
    </div>
</template>