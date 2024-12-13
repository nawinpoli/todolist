<script setup>
import { defineProps, defineEmits, ref } from "vue";

const isPopupVisible = ref(false);
const editvalue = ref("");

const props = defineProps({
  title: String,
});

const emits = defineEmits(["delete", "edit"]);

function togglePopup() {
  isPopupVisible.value = !isPopupVisible.value;
}

function handleEdit() {
  emits("edit", editvalue.value);
  togglePopup();
}

function handleDelete() {
  emits("delete");
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4">
    <div class="flex items-center">
      <input 
        type="checkbox" 
        class="mr-2 w-5 h-5 text-blue-500 rounded focus:ring focus:ring-blue-300" 
      />
      <p class="text-gray-800 line-clamp-1">
        {{ title }}
      </p>
    </div>

    <div class="flex space-x-2">
      <button 
        @click="togglePopup"
        class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
      >
        Edit
      </button>
      <div
        v-if="isPopupVisible"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded shadow-lg w-80">
          <input v-model="editvalue" type="text" placeholder="New value" class="border rounded px-2 py-1 w-full" />
          <button
            @click="handleEdit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            @click="togglePopup"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>

      <button 
        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
        @click="handleDelete"
      >
        Delete
      </button>
    </div>
  </div>
</template>
