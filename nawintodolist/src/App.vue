<script setup>
import mlayout from './layouts/mlayout.vue';
import { ref, onMounted } from "vue";
import todocard from './components/todocard.vue';
import axios from "axios";

// State variables
const todolist = ref([]);
const newtodo = ref("");

// API base URL
const API_BASE = "http://localhost:3000/todos";

// Fetch todos from API
async function fetchTodos() {
  try {
    const response = await axios.get(API_BASE);
    todolist.value = response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

// Add a new todo
async function submithandle() {
  if (newtodo.value.trim()) {
    try {
      const response = await axios.post(API_BASE, { title: newtodo.value });
      todolist.value.push(response.data);
      newtodo.value = "";
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }
}

// Edit a todo
async function handleedit(data, index) {
  const todo = todolist.value[index];
  try {
    const response = await axios.put(`${API_BASE}/${todo._id}`, { title: data });
    todolist.value[index] = response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
}

// Delete a todo
async function deletetodo(index) {
  const todo = todolist.value[index];
  try {
    await axios.delete(`${API_BASE}/${todo._id}`);
    todolist.value.splice(index, 1);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

// Fetch todos on component mount
onMounted(fetchTodos);
</script>

<template>
  <mlayout>
    <!-- Input for new todo -->
    <div class="mb-4">
      <input 
        type="text" 
        placeholder="New todo list" 
        v-model="newtodo" 
        class="border rounded px-2 py-1 w-full"
      />
      <button 
        @click="submithandle" 
        class="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition"
      >
        Create
      </button>
    </div>

    <!-- Todo list -->
    <ul>
      <li v-for="(item, index) in todolist" :key="item._id" class="mb-2">
        <todocard :title="item.title" @delete="() => deletetodo(index)" @edit="(data) => handleedit(data, index)" />
      </li>
    </ul>
  </mlayout>
</template>
