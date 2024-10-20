import { Notification } from '@lamia/models/notification';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    setNotificationRead(state, action: PayloadAction<number>) {
      const notifications = state.notifications;
      const notification = notifications.find(
        noti => noti.id === action.payload,
      );

      if (notification) {
        notification.is_view = 1;
      }
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setNotifications,
  clearNotifications,
  setLoading,
  setNotificationRead,
} = notificationSlice.actions;
export default notificationSlice.reducer;
