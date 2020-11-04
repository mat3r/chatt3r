<template>
  <div class="home">
    <sign-in
      v-if="!showChat"
      @join-chat="joinChat"
    ></sign-in>
    <chat
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
      showChat: false
    }
  },
  methods: {
    joinChat (e) {
      this.$store.commit('SET_USERNAME', e.username)
      this.$store.commit('SET_ROOM', e.room)
      this.$socket.emit('join', e)
      this.showChat = true
    },
    leaveChat() {
      this.$socket.emit('leave')
      this.showChat=false
      this.$store.commit('CLEAR_USERNAME')
      this.$store.commit('CLEAR_ROOM')
    }
  }
}
</script>
