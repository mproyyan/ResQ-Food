import { defineStore } from "pinia"
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
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
                const docRef = await addDoc(collection(db, "products"), { status: "Validasi", ...payload })
                return docRef.id
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
                    this.products.push({ id: product.id, ...product.data() })
                })

                return this.products
            } catch (error) {
                return error
            }
        },

        async getProduct(productId) {
            try {
                const docRef = doc(db, "products", productId)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    this.product = docSnap.data()
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error)
                return error
            }
        }
    }
})