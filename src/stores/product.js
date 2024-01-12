import { defineStore } from "pinia"
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "@/firebase"

export const useProductStore = defineStore("product", {
    state: () => {
        return {
            products: [],
            product: null
        }
    },

    actions: {
        async requestProduct(payload) {
            try {
                console.log({ status: "Validasi", ...payload })
                const docRef = await addDoc(collection(db, "products"), { status: "Validasi", ...payload })
                console.log(docRef.id)
            } catch (error) {
                console.log(error)
                return error
            }
        },

        async getProducts() {
            try {
                this.products.splice(0, this.products.length)
                const products = await getDocs(collection(db, "products"))
                products.forEach((product) => {
                    this.products.push(product.data())
                })

                return this.products
            } catch (error) {
                return error
            }
        }
    }
})