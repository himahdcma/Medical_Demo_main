import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { OrderTimeline } from '../../components/orders/OrderTimeline';
import { useOrderStore } from '../../store/useOrderStore';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { OrderStatus } from '../../types';
import {
  Package,
  MapPin,
  CreditCard,
  Printer,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileUp,
  AlertCircle
} from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus } = useOrderStore();

  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4 px-4">
        <h2 className="text-xl font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500">We could not locate order #{id}.</p>
        <Button onClick={() => navigate('/orders')} variant="primary">
          Back to Orders
        </Button>
      </div>
    );
  }

  // Interactive step simulator for testing order tracking states!
  const statusProgression: OrderStatus[] = [
    'Order Placed',
    'Payment Confirmed',
    'Pharmacist Approved',
    'Preparing Order',
    'Packed',
    'Out for Delivery',
    'Delivered',
  ];

  const handleSimulateNextStep = () => {
    const currentIndex = statusProgression.indexOf(order.currentStatus);
    if (currentIndex < statusProgression.length - 1) {
      const nextStatus = statusProgression[currentIndex + 1];
      updateOrderStatus(order.id, nextStatus, `Updated live via hospital dispatch system to: ${nextStatus}`);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb
        items={[
          { label: 'My Orders', href: '/orders' },
          { label: `Order #${order.orderNumber}` },
        ]}
      />

      {/* Header with status badge & actions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-2.5 py-0.5 rounded-md">
                Hospital Order
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{order.createdAt}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Order #{order.orderNumber}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handlePrintInvoice}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Invoice
            </Button>

            {/* Interactive Demo Progression button */}
            {order.currentStatus !== 'Delivered' && (
              <Button
                onClick={handleSimulateNextStep}
                variant="teal"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <span>Advance Status ⏩</span>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Current Status</span>
            <span className="font-extrabold text-medical-700 text-sm">
              {order.currentStatus}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Delivery Method</span>
            <span className="font-semibold text-slate-800">
              {order.deliveryMethod.title}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Payment Mode</span>
            <span className="font-semibold text-slate-800">
              {order.paymentMethod.type} ({order.paymentMethod.status})
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Total Paid</span>
            <span className="font-extrabold text-slate-900 text-sm">
              {formatCurrency(order.pricing.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column: Timeline (Left) + Details & Items (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 7-Step Visual Timeline */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Live Order Timeline
            </h3>
            <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
              GPS & RFID Synced
            </span>
          </div>

          <OrderTimeline steps={order.timeline} />

          <div className="pt-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-medical-600 shrink-0" />
            <span>Delivery Helpdesk: 1800-419-8800 (Ext 4 for Courier Dispatch)</span>
          </div>
        </div>

        {/* Right: Items, Shipping Address & Cost Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Items Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Prescribed & Ordered Items ({order.items.length})
            </h3>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 truncate">
                          {item.productName}
                        </h4>
                        {item.prescriptionRequired && (
                          <Badge variant="rx" size="sm">
                            Rx
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        {item.genericName} • Qty: {item.quantity}
                      </p>
                      <span className="text-[11px] font-semibold text-slate-700">
                        {formatCurrency(item.price)} each
                      </span>
                    </div>
                  </div>

                  <span className="font-extrabold text-slate-900 text-sm shrink-0">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown rows */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span>{formatCurrency(order.pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Hospital Delivery Charges</span>
                <span>
                  {order.pricing.deliveryFee === 0
                    ? 'FREE'
                    : formatCurrency(order.pricing.deliveryFee)}
                </span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount Applied ({order.pricing.couponCode || 'PROMO'})</span>
                  <span>- {formatCurrency(order.pricing.discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Total Amount Paid</span>
                <span>{formatCurrency(order.pricing.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Recipient Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Delivery Address & Recipient
            </h3>
            <div className="text-xs space-y-1 leading-relaxed text-slate-600">
              <div className="font-bold text-slate-900 text-sm">
                {order.shippingAddress.fullName}
              </div>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && (
                <p>{order.shippingAddress.addressLine2}</p>
              )}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                <span className="font-bold">{order.shippingAddress.pincode}</span>
              </p>
              <p className="pt-1 font-semibold text-slate-800">
                Mobile: {order.shippingAddress.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
