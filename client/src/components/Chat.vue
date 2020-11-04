<template>
  <div class="md:container md:mx-auto">

    <!-- Chat Board Header -->
    <div class="h-16 px-8 md:mt-6 bg-indigo-600 flex justify-between items-center">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-10 h-10">
          <circle cx="12" cy="12" r="10" class="text-white"/>
          <path class="text-indigo-700" d="M6.8 14h10.4a1 1 0 0 1 .86 1.5 7 7 0 0 1-12.12 0A1 1 0 0 1 6.8 14zm1.7-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
        <h2 class="ml-4 text-3xl font-bold tracking-wider text-white">Chatt3r</h2>
      </div>
      <button
        @click="$emit('leave-chat')"
        class="h-10 px-6 bg-gray-300 text-gray-800 rounded focus:outline-none focus:shadow-outline hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-6 h-6">
          <path class="text-indigo-400" d="M11 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V6h-2v12h2v-2a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1h-3v1a1 1 0 0 1-1.27.96l-6.98-2A1 1 0 0 1 2 19V5a1 1 0 0 1 .75-.97l6.98-2A1 1 0 0 1 11 3v1z"/>
          <path class="text-indigo-700" d="M18.59 11l-1.3-1.3c-.94-.94.47-2.35 1.42-1.4l3 3a1 1 0 0 1 0 1.4l-3 3c-.95.95-2.36-.46-1.42-1.4l1.3-1.3H14a1 1 0 0 1 0-2h4.59z"/>
        </svg>
      </button>
    </div>

    <!-- Chat Board Sidebar & Content Section -->
    <div class="flex flex-col md:flex-row md:h-4/5">
      <!-- Sidebar-->
      <div class="md:w-64 p-2 md:p-4 bg-indigo-500">
        <!-- Room -->
        <div class="flex items-center ml-4 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-6 h-6 md:w-8 md:h-8">
            <path class="text-white" d="M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            <path class="text-white" d="M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z"/>
          </svg>
          <h4 class="ml-4 text-white md:text-lg font-bold">Chat Room:</h4>
        </div>
        <div class="py-2 px-4 mb-2 md:mb-6 w-full bg-indigo-600 text-white rounded-md tracking-wider font-bold">{{ room }}</div>

        <!-- Users -->
        <div class="flex items-center ml-4 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-6 h-6 md:w-8 md:h-8">
            <path class="text-gray-400" d="M12 13a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3zM7 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            <path class="text-white" d="M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3 1h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z"/>
          </svg>
          <h4 class="ml-4 text-white md:text-lg font-bold">Users:</h4>
        </div>
        <ul class="hidden md:block">
          <li
            class="py-1 pl-8 text-white"
            v-for="( user, index ) in users"
            :key="index"
          >{{ user.username }}</li>
        </ul>
        <div class="md:hidden mx-2">
          <span
            class="pl-4 text-white text-sm"
            v-for="( user, index ) in users"
            :key="index"
          >{{ user.username }}</span>
        </div>
      </div>

      <!-- Content: Messages -->
      <div ref="mesgs" class="p-2 h-1/2 md:min-h-full overflow-auto md:flex-1 bg-gray-200">
        <ul class="px-8">
          <li
            class="flex mb-1 rounded-lg"
            :class="mesg.sender===username?'text-right justify-end border-r-8 border-green-500':'justify-start border-l-8 border-yellow-500'"
            v-for="mesg in messages"
            :key="mesg.id"
          >
          <div
            class="px-2 py-1"
            :class="mesg.sender===username?'bg-green-200':'bg-yellow-200'"
            >
            <span v-if="mesg.sender!=='Admin'" class="mr-2 text-sm font-bold text-gray-600">{{ mesg.sender }}</span>
            <span class="text-xs text-gray-600">{{ formatDate(mesg.date) }}</span>
            <p v-if="mesg.sender!=='Admin'">{{ mesg.content }}</p>
            <span v-if="mesg.sender==='Admin'" class="ml-4 text-gray-600 text-sm italic">{{ mesg.content }}</span>
          </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Chat Board Footer: Enter Message -->
    <div class="h-20 px-8 bg-indigo-600 flex justify-between items-center">
      <input
        ref="myMesg"
        v-model="myMesg"
        type="text"
        class="w-full h-10 px-2 rounded-l text-gray-800 text-lg placeholder-gray-600 focus:outline-none"
        placeholder=" Enter Message ..."
        @keydown.enter="sendMesg"
      >
      <button
        @click="sendMesg"
        class="h-10 pl-4 pr-6 bg-gray-200 text-gray-800 rounded-r focus:outline-none focus:shadow-outline hover:bg-gray-300 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-6 h-6">
          <g transform="rotate(30) translate(7,-8)">
            <path class="text-indigo-400" d="M12 1v15.97l-1 1.12-8.6 1.82a1 1 0 0 1-1.3-1.36l9-18A.99.99 0 0 1 11 0l1 1z"/>
            <path class="text-indigo-700" d="M11 0c.36 0 .71.18.9.55l9 18a1 1 0 0 1-1.3 1.36L11 18.1V0z"/>
          </g>
        </svg>
        <span class="ml-3">Send</span>
      </button>
    </div>
  </div>
</template>

<script>
// Imports
import mainService from '@/services/mainService'
import { mapState } from 'vuex'
import { format} from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

// Export component instance
export default {
  name: 'Chat',
  computed: {
    ...mapState([ 'username', 'users', 'room' ])
  },
  async created () {
    try {
      const response = await mainService.loadMessages(this.room)
      this.messages = response.data
    } catch (err) {
      alert(err.message)
    }
  },
  updated() {
    this.scrollMesgsDiv()
  },
  data () {
    return {
      myMesg: null,
      messages: []
    }
  },
  sockets: {
    server (mesg) {
      this.messages.push(mesg)
    }
  },
  methods: {
    formatDate (d) {
      d = +d;
      return format(d, "H:mm aaaa")
    },
    scrollMesgsDiv () {
      this.$nextTick(() => {
        this.$refs.mesgs.scrollTop = this.$refs.mesgs.scrollHeight
      })
    },
    sendMesg () {
      this.$socket.emit('user', this.myMesg)
      this.myMesg = ''
      this.$refs.myMesg.focus()
    }
  }
}
</script>
