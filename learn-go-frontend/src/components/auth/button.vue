<template>
  <div id="container" :class="{ loading: loading }">
    <span v-if="!loading" class="material-icons">arrow_forward</span>
    <div v-else id="loader" class="loader"></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
#container {
  position: relative;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.25rem;
  background: #383838;
  text-align: center;
  cursor: pointer;
  transition: all 1s;
}

span {
  line-height: 2.5rem;
  color: #e8e8e8;
}

#container:hover {
  background: #787878;
}

#container.loading {
  width: 2.5rem;
}

#container.loading:hover {
  background: #383838;
}

#loader {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  border: 0.2rem solid transparent;
  border-top: 0.2rem solid #e8e8e8;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
}
</style>

<style>
.loader {
  animation: 2s spin linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
