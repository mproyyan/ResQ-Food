<script setup>
import { useProductStore } from "@/stores/product"
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const productStore = useProductStore()
const route = useRoute()

onMounted(async () => {
    await productStore.getProduct(route.params.id)
})

</script>

<template>
    <div class="w-50" v-if="productStore.product">
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div v-for="image in productStore.product.images" class="carousel-item active">
                    <img :src="image.url" class="d-block w-100" :alt="image.title">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <h5>{{ productStore.product.name }}</h5>
        <p>{{ productStore.product.description }}</p>

        <h6 class="mt-2">Harga</h6>
        <div class="d-flex">
            <span class="text-decoration-line-through" style="margin-right: 8px;">Rp. {{ productStore.product.normalPrice
            }}</span>
            <span class="fw-medium fs-5">Rp. {{ productStore.product.sellingPrice }}</span>
        </div>

        <h6 class="mt-2">Status</h6>
        <span v-if="productStore.product.status === 'Validasi'" class="badge rounded-pill text-bg-info">{{
            productStore.product.status
        }}</span>
        <span v-else-if="productStore.product.status === 'Diterima'" class="badge rounded-pill text-bg-success">{{
            productStore.product.status
        }}</span>
        <span v-else-if="productStore.product.status === 'Ditolak'" class="badge rounded-pill text-bg-danger">{{
            productStore.product.status
        }}</span>
    </div>
</template>