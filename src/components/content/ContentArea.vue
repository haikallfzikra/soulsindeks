<template>
  <div>
    <!-- Gallery -->
    <div ref="galleryEl" class="gallery relative w-full h-screen overflow-hidden">
      <ul
        class="cards absolute w-56 h-72 top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 m-0"
      >
        <li
          v-for="(image, index) in [...images, ...images]"
          :key="index"
          :style="{ backgroundImage: `url(${image})` }"
          class="list-none p-0 m-0 w-56 aspect-9/16 text-center absolute bg-contain bg-no-repeat top-0 left-0 rounded-[0.8rem]"
        />
      </ul>

      <div
        class="actions absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4"
      >
        <button
          ref="prevBtn"
          class="px-5 py-2 bg-white text-black font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
        >
          Prev
        </button>
        <button
          ref="nextBtn"
          class="px-5 py-2 bg-white text-black font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Drag Proxy -->
    <div class="drag-proxy invisible absolute" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, Draggable)

const galleryEl = ref(null)
const prevBtn = ref(null)
const nextBtn = ref(null)

const images = [
  'https://assets.codepen.io/16327/portrait-number-01.png',
  'https://assets.codepen.io/16327/portrait-number-02.png',
  'https://assets.codepen.io/16327/portrait-number-03.png',
  'https://assets.codepen.io/16327/portrait-number-04.png',
  'https://assets.codepen.io/16327/portrait-number-05.png',
  'https://assets.codepen.io/16327/portrait-number-06.png',
  'https://assets.codepen.io/16327/portrait-number-07.png',
]

let scrub, trigger, draggable

onMounted(() => {
  const spacing = 0.1
  const snapTime = gsap.utils.snap(spacing)
  const cards = gsap.utils.toArray(galleryEl.value.querySelectorAll('.cards li'))

  gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 })

  const animateFunc = (element) => {
    const tl = gsap.timeline()
    tl.fromTo(
      element,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        zIndex: 100,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'power1.in',
        immediateRender: false,
      },
    ).fromTo(
      element,
      { xPercent: 400 },
      { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
      0,
    )
    return tl
  }

  const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc)
  const playhead = { offset: 0 }
  const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration())

  scrub = gsap.to(playhead, {
    offset: 0,
    onUpdate() {
      seamlessLoop.time(wrapTime(playhead.offset))
    },
    duration: 0.5,
    ease: 'power3',
    paused: true,
  })

  // ─── Trigger: pin gallery, update offset berdasarkan progress (0→1)
  // Tidak ada wrap/scroll-reset agar halaman tidak loncat ke atas
  trigger = ScrollTrigger.create({
    trigger: galleryEl.value,
    start: 'top top',
    end: '+=3000',
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate(self) {
      // progress 0→1, kita mapping ke seamlessLoop duration berkali-kali
      // dengan repeat factor supaya card bisa muter lebih dari sekali
      const repeatFactor = 3 // berapa kali loop penuh dalam rentang scroll
      scrub.vars.offset = self.progress * seamlessLoop.duration() * repeatFactor
      scrub.invalidate().restart()
    },
  })

  // Snap ke card terdekat saat scroll berhenti
  ScrollTrigger.addEventListener('scrollEnd', () => {
    const snapped = snapTime(scrub.vars.offset)
    scrub.vars.offset = snapped
    scrub.invalidate().restart()
  })

  // Tombol next/prev
  nextBtn.value.addEventListener('click', () => {
    scrub.vars.offset += spacing
    scrub.invalidate().restart()
  })
  prevBtn.value.addEventListener('click', () => {
    scrub.vars.offset -= spacing
    scrub.invalidate().restart()
  })

  // Drag support
  draggable = Draggable.create('.drag-proxy', {
    type: 'x',
    trigger: galleryEl.value.querySelector('.cards'),
    onPress() {
      this.startOffset = scrub.vars.offset
    },
    onDrag() {
      scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001
      scrub.invalidate().restart()
    },
    onDragEnd() {
      scrub.vars.offset = snapTime(scrub.vars.offset)
      scrub.invalidate().restart()
    },
  })
})

onBeforeUnmount(() => {
  trigger?.kill()
  scrub?.kill()
  draggable?.[0]?.kill()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})

function buildSeamlessLoop(items, spacing, animateFunc) {
  let overlap = Math.ceil(1 / spacing)
  let startTime = items.length * spacing + 0.5
  let loopTime = (items.length + overlap) * spacing + 1
  let rawSequence = gsap.timeline({ paused: true })
  let seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      this._time === this._dur && (this._tTime += this._dur - 0.01)
    },
  })
  let l = items.length + overlap * 2

  for (let i = 0; i < l; i++) {
    let index = i % items.length
    let time = i * spacing
    rawSequence.add(animateFunc(items[index]), time)
    i <= items.length && seamlessLoop.add('label' + i, time)
  }

  rawSequence.time(startTime)
  seamlessLoop
    .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: 'none' })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: 'none',
      },
    )
  return seamlessLoop
}
</script>
