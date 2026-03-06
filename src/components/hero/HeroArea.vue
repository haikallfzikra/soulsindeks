<template>
  <section id="about" class="bg-black flex justify-between items-center px-5 py-43">
    <!-- Text Content -->
    <div class="w-full max-w-210 pl-25">
      <h1 class="text-white text-[40px] font-bold mb-4">This is Soulsindeks</h1>
      <p class="text-white leading-relaxed">
        Soulsindeks is a clean and user-friendly web gallery designed to showcase images with
        simplicity and elegance. Its minimalist interface allows users to browse through curated
        collections effortlessly, whether on a desktop or mobile device. With intuitive navigation
        and customizable features, Soulsindeks offers a seamless viewing experience for anyone
        looking to enjoy visual content online.
      </p>

      <!-- Buttons -->
      <div class="flex gap-3 mt-4">
        <button
          class="w-25 py-2 px-3 rounded-full bg-black text-white border-2 border-white mt-4 cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
        >
          Gallery
        </button>
        <button
          class="w-20 py-2 px-3 rounded-full bg-black text-white border-2 border-white mt-4 cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
        >
          Contact
        </button>
      </div>
    </div>

    <!-- Image (commented out, preserved for later use) -->
    <!-- <div class="overflow-hidden flex items-center mr-[100px]">
      <img
        src="img/bonfire-dark-souls.gif"
        alt="bonfire"
        draggable="false"
        class="rounded-[20px] w-full max-w-[400px] pr-[120px]"
      />
    </div> -->
  </section>
</template>

<script setup></script>
