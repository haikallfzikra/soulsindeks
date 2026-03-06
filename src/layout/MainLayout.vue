<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/header/HeaderArea.vue'
import Footer from '@/components/footer/FooterArea.vue'
</script>
