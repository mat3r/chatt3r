<template>
  <div class="home">
    <sign-in
      v-if="!showChat"
      @join-chat="joinChat"
    ></sign-in>
    <chat
      :username="username"
      :room="room"
      v-if="showChat"
      @leave-chat="leaveChat"
    ></chat>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'Home',
  components: {
    Chat,
    SignIn
  },
  data () {
    return {
      showChat: false,
      username: null,
      room: null
    }
  },
  methods: {
    joinChat (e) {
      this.username = e.username
      this.room = e.room
      this.$socket.emit('joinRoom', e)
      this.showChat = true
    },
    leaveChat() {
      this.$socket.emit('leaveRoom')
      this.showChat=false
      this.username = null
      this.room = null
    }
  }
}
</script>
