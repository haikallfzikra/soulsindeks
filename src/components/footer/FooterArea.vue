<template>
  <footer id="footer" class="bg-black flex flex-col gap-8 text-white py-8">
    <!-- Container -->
    <div class="flex justify-around flex-wrap gap-8">
      <!-- Title / About -->
      <div class="w-full max-w-95">
        <h1 class="text-white text-[35px] font-bold mb-3">Soulsindeks</h1>
        <p class="text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eos dolor tempore totam
          illum. Facilis consectetur quo voluptates fugit dolor.
        </p>
      </div>

      <!-- Contact -->
      <div class="w-full max-w-75 flex flex-col gap-2">
        <h1 class="text-white text-[35px] font-bold">Contact Me</h1>
        <a
          href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMTFJZsQtqBfGbPhrmBmDVCZkjsltCmdBZWLWntWSmktJPfDPLRCsCNxgXmbfBBXcqgGqCW"
          target="_blank"
          class="text-white text-xl no-underline hover:opacity-75 transition-opacity"
        >
          soulsindeks@gmail.com
        </a>

        <h1 class="text-white text-[35px] font-bold mt-4">Social Media</h1>
        <div class="flex gap-4">
          <a
            href="https://www.instagram.com/ducter77/?hl=en"
            target="_blank"
            class="instagram-icon text-white text-[25px] w-10 h-10 flex justify-center items-center transition-all duration-300"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>

      <!-- Playlist -->
      <div class="w-full max-w-150">
        <h1 class="text-white text-[35px] font-bold mb-3">Playlist</h1>
        <iframe
          style="border-radius: 12px"
          src="https://open.spotify.com/embed/playlist/1WhXRUjNXU1cDeTYhnvlLU?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>

    <!-- Copyright -->
    <div class="flex justify-center text-gray-400 text-sm">
      <p>
        <i class="fa-regular fa-copyright"></i>
        2024 <b class="text-white">Soulsindeks</b>. All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<script setup>
// No reactive data needed for this component
</script>

<style scoped>
.instagram-icon:hover {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
