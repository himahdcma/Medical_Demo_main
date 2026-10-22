import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '../common/Drawer';
import { useNotificationStore } from '../../store/useNotificationStore';
import { CheckCheck, Package, FileText, Sparkles, AlertCircle, Bell } from 'lucide-react';
import { Button } from '../common/Button';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-medical-600" />;
      case 'prescription':
        return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'offer':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) {
      navigate(link);
      onClose();
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Notification Center" side="right">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <span className="text-xs text-slate-500 font-medium">
            Stay updated with your healthcare orders & prescriptions
          </span>
          <button
            onClick={markAllAsRead}
            className="text-xs text-medical-600 hover:text-medical-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Bell className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No notifications yet</p>
            <p className="text-xs mt-1">We will notify you when your order or prescription updates.</p>
          </div>
        ) : (
          <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item.id, item.link)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                  item.read
                    ? 'bg-white border-slate-100 hover:border-slate-200'
                    : 'bg-medical-50/40 border-medical-200/80 hover:bg-medical-50/70 shadow-xs'
                }`}
              >
                {!item.read && (
                  <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-medical-500 ring-4 ring-medical-100" />
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 pr-3">
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-2 block font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};
