<script setup>
import { ref, reactive } from "vue";
import vueFilePond from "vue-filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);

const images = ref([])
const pond = ref(null)

const serverOption = reactive({
    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        const formData = new FormData();
        formData.append(fieldName, file, file.name);

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchRequest = fetch('https://api.imgbb.com/1/upload?key=' + import.meta.env.VITE_IMGBB_API, {
            method: 'POST',
            body: formData,
            signal: signal,
        });

        // Response handling
        fetchRequest.then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
            .then(data => {
                console.log(data)
                load(data.data.delete_url)
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    abort();
                } else {
                    error('Terjadi kesalahan saat upload:', error.message);
                }
            });

        return {
            abort: () => {
                controller.abort();
            },
        };
    },
    revert: (uniqueFileId, load, error) => {
        error('oh my goodness');
        load();
    },
})

function handleFilePondInit() {
    console.log("filepond init")
    console.log(pond.value.getFiles())
}
</script>

<template>
    <div class="card mt-3 mb-5">
        <div class="card-body">
            <h4 class="card-title mb-3">Request Produk</h4>
            <form>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Nama Produk</label>
                        <input type="text" class="form-control" id="name" name="name">
                    </div>
                    <div class="col-md-6">
                        <label for="type" class="form-label">Jenis</label>
                        <select class="form-control" name="type" id="type">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <label for="description" class="form-label">Deskripsi</label>
                        <textarea class="form-control" name="description" id="description"></textarea>
                    </div>
                    <div class="col-md-4">
                        <label for="unit" class="form-label">Unit</label>
                        <input type="number" min="1" class="form-control" id="unit" name="unit">
                    </div>
                    <div class="col-md-4">
                        <label for="unitType" class="form-label">Satuan</label>
                        <select class="form-control" name="unitType" id="unitType">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="expired" class="form-label">Expired</label>
                        <input type="date" class="form-control" id="expired" name="expired">
                    </div>
                    <div class="col-md-12">
                        <label for="location" class="form-label">Lokasi</label>
                        <select class="form-control" name="location" id="location">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="normalPrice" class="form-label">Harga Normal</label>
                        <input type="number" min="1" class="form-control" id="normalPrice" name="normalPrice">
                    </div>
                    <div class="col-md-6">
                        <label for="sellingPrice" class="form-label">Harga Jual</label>
                        <input type="number" min="1" class="form-control" id="sellingPrice" name="sellingPrice">
                    </div>
                    <div class="col-md-12">
                        <label for="images" class="form-label">Foto Produk</label>
                        <FilePond name="image" ref="pond" class-name="my-pond" label-idle="Drop files here..."
                            allow-multiple="true" accepted-file-types="image/jpeg, image/png" :files="images"
                            @init="handleFilePondInit" :server="serverOption" />
                    </div>
                </div>
                <button class="btn btn-primary mt-3" type="submit">Request</button>
            </form>
        </div>
    </div>
</template>