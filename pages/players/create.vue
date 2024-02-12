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
      canvas.width = 64;
      canvas.height = 64;

      // ตรวจสอบอัตราส่วนภาพ
      if (aspectRatio > 1) {
        // รูปภาพแนวนอน
        const newHeight = 64;
        const newWidth = newHeight * aspectRatio;

        ctx.drawImage(image, 0, 0, newWidth, newHeight);
      } else {
        // รูปภาพแนวตั้ง
        const newWidth = 64;
        const newHeight = newWidth / aspectRatio;
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
      }

      const resizedImage = canvas.toDataURL('image/png');

      fileUrl.value = resizedImage
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div>
    <!--  -->
    <input ref="fileInput" type="file" @change="handleFileChange" />
    <img v-if="fileUrl" :src="fileUrl" />

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