<template>
  <section>
    <div class="relative flex items-center justify-center overflow-hidden">
      <div class="mx-auto z-20 w-full max-w-screen-xl py-24 text-center lg:py-28">
        <div class="mx-auto max-w-2xl">
          <h1 class="text-white text-4xl mb-6 font-semibold">
            Conviértete en un provocador de Avivamiento
          </h1>
          <p class="text-white text-xl mb-12">
            Aprende a manifestar el Reino de Dios y cumplir efectivamente la
            misión de Jesús en tu entorno
          </p>
          <HomeCTAButton />
        </div>
      </div>
      <div
        class="absolute z-10 w-auto min-w-full min-h-full max-w-none bg-black opacity-50"
      ></div>
      <video
        src="/hero-bg.mp4"
        autoplay="true"
        loop
        muted
        class="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      ></video>
    </div>
  </section>
</template>
