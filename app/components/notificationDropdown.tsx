"use client";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import {
  fetchNotifications,
  fetchUnreadCount,
  markAllNotificationsRead,
} from "@/app/api/slice/getNotificationSlice";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { notifications, unreadCount } = useAppSelector(
    (state) => state.getnotification,
  );

  // Fetch notifications when component mounts
  useEffect(() => {
    dispatch(fetchUnreadCount());
    setLoading(false);
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Count unread notifications (assuming your entity has `isRead` field)
  const handleClicked = () => {
    dispatch(fetchUnreadCount());
    dispatch(fetchNotifications());
  };
  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          if (open === false) {
            dispatch(markAllNotificationsRead());
            dispatch(fetchUnreadCount());
            dispatch(fetchNotifications());
          }
        }}
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <Bell className="w-6 h-6 text-gray-800" onClick={() => handleClicked} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border border-gray-200 max-h-96 overflow-y-auto z-50"
          >
            <div className="p-3 border-b font-semibold text-gray-800">
              Notifications
            </div>

            {loading ? (
              <p className="p-3 text-gray-500 text-center">Loading...</p>
            ) : notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition ${
                    !n.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <h4 className="font-semibold text-gray-900">{n.title}</h4>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  <span
                    className={`text-xs mt-1 inline-block ${
                      n.isRead ? "text-gray-400" : "#00b4d8 font-medium"
                    }`}
                  >
                    {n.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="p-3 text-gray-500 text-center">
                No notifications yet.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
