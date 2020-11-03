import api from './api';

export default {
  loadMessages (room) {
    return api().get(`/messages/${room}`);
  }
};

