<template>
  <header class="flex flex-col">
    <nav class="flex justify-between items-center bg-black px-30 py-5">
      <!-- Logo -->
      <div class="navbar-logo">
        <a
          href=""
          class="text-white text-3xl font-bold no-underline tracking-wide hover:opacity-80 transition-opacity"
        >
          Soulsindeks
        </a>
      </div>

      <!-- Nav Links -->
      <ul class="flex list-none gap-8 items-center">
        <li v-for="item in navItems" :key="item.label">
          <a
            :href="item.href"
            :target="item.target || '_self'"
            class="nav-link text-white text-xl font-bold no-underline tracking-widest relative"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#about', target: '_blank' },
  { label: 'Contact', href: '#footer' },
  { label: 'ToDo', href: '#about', target: '_blank' },
]
</script>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #fff;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
