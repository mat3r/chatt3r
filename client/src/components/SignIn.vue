<template>
  <div class="w-full sm:w-1/2 md:1/3 lg:w-1/4 sm:mt-20 mx-auto">
    <div class="h-16 text-center bg-indigo-600">
      <h2 class="pt-2 text-3xl font-bold tracking-wider text-white">Chatt3r</h2>
    </div>
    <div class="bg-indigo-400 p-4"v>
      <label class="block mt-2 mb-8">
        <span class="text-white">Username</span>
        <input
          v-model="username"
          type="text"
          class="form-input block w-full mt-1"
          placeholder="Enter Username ..."
        >
      </label>
      <label class="block mb-8">
        <span class="text-white">Chat Room</span>
        <select v-model="room" class="form-select block mt-1 w-full">
          <option>JavaScript</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>NodeJs</option>
          <option>Database</option>
          <option>Machine Learning</option>
        </select>
      </label>
      <button
        @click="$emit('join-chat', { username, room })"
        class="w-full py-2 mb-6 bg-indigo-600 uppercase font-bold text-white tracking-widest rounded focus:outline-none focus:shadow-outline hover:shadow-lg"
      >Join Chat</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      username: null,
      room: 'JavaScript'
    }
  }
}
</script>
