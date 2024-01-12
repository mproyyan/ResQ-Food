import { defineStore } from "pinia"
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import db from "@/firebase"

export const useLocationStore = defineStore('location', {
    state: () => {
        return {
            locations: [],
            location: null,
        }
    },

    actions: {
        async getLocations() {
            try {
                this.locations.splice(0, this.locations.length)
                const locations = await getDocs(collection(db, "locations"))
                locations.forEach(location => {
                    this.locations.push({ id: location.id, ...location.data() })
                });

                return this.locations
            } catch (error) {
                return error
            }
        },

        async getLocation(locationId) {
            try {
                const docRef = doc(db, "locations", locationId)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    this.location = { id: docRef.id, ...docSnap.data() }
                    return this.location
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                return error
            }
        }
    }
})