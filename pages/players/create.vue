<script setup lang="ts">
const { addPlayer } = useGamesStore()
const router = useRouter()
const newPlayerName = defineModel({ default: '' })

const addNewPlayer = () => {
  if (fileUrl.value) {
    addPlayer({ id: Date.now(), name: newPlayerName.value, img: fileUrl.value });
  }
  else {
    addPlayer({ id: Date.now(), name: newPlayerName.value, img: '' });
  }
  router.back();
}

const cancel = () => {
  router.back();
}

// 

const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()

function handleFileChange() {
  files.value = fileInput.value?.files;
  resizeAndCrop();
}

let fileUrl = ref('')

const resizeAndCrop = () => {
  const size = 120;
  const file = files.value[0]
  //
  const reader = new FileReader();
  reader.onload = (event) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // หาอัตราส่วนภาพ
      const aspectRatio = image.width / image.height;

      // ตั้งขนาด canvas ให้เท่ากับขนาดที่ต้องการ
      canvas.width = size;
      canvas.height = size;

      // ตรวจสอบอัตราส่วนภาพ
      if (aspectRatio > 1) {
        // รูปภาพแนวนอน
        const newHeight = size;
        const newWidth = newHeight * aspectRatio;

        ctx?.drawImage(image, 0, 0, newWidth, newHeight);
      } else {
        // รูปภาพแนวตั้ง
        const newWidth = size;
        const newHeight = newWidth / aspectRatio;
        ctx?.drawImage(image, 0, 0, newWidth, newHeight);
      }

      const resizedImage = canvas.toDataURL('image/png');

      fileUrl.value = resizedImage
    };
    const result = event?.target?.result as string;
    image.src = result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div>
    <!--  -->
    <label for="file-upload" class="block w-24">
      <div class="avatar">
        <div class="w-24 mask mask-hexagon bg-neutral">
          <img class="w-24 h-24" v-if="fileUrl" :src="fileUrl" />
          <svg class="svg-icon w-24 h-24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path fill="none"
              d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z">
            </path>
            <path fill="none"
              d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z">
            </path>
          </svg>
        </div>
      </div>
    </label>
    <input class="hidden" id="file-upload" ref="fileInput" type="file" @change="handleFileChange" />


    <!--  -->
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Name</span>
      </div>
      <input type="text" placeholder="Luka" class="input input-bordered w-full max-w-xs" v-model="newPlayerName" />
    </label>
    <button class="btn btn-secondary mt-4" @click="addNewPlayer">Add Player</button>
    <button class="btn btn-ghost" @click="cancel">Cancel</button>
  </div>
</template>

<style>
.svg-icon {
  width: 6em;
  height: 6em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #b3b3b3;
}

.svg-icon circle {
  stroke: #1e3c63;
  stroke-width: 1;
}
</style>