import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { usePrescriptionStore } from '../../store/usePrescriptionStore';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { AddressCard } from '../../components/checkout/AddressCard';
import { AddressModal } from '../../components/checkout/AddressModal';
import { DeliveryMethodSelect } from '../../components/checkout/DeliveryMethodSelect';
import { PaymentSelect, PaymentMethodType } from '../../components/checkout/PaymentSelect';
import { PriceSummary } from '../../components/cart/PriceSummary';
import { Button } from '../../components/common/Button';
import { Order, OrderStatus } from '../../types';
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  Plus,
  ShieldCheck,
  AlertCircle,
  FileUp,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    getSubtotal,
    getDeliveryFee,
    getCouponDiscount,
    getTotal,
    appliedCoupon,
    clearCart,
    requiresPrescription,
  } = useCartStore();

  const { addresses, addAddress, deleteAddress } = useAuthStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const uploadPrescription = usePrescriptionStore((state) => state.uploadPrescription);

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses[0]?.id || ''
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'hospital_pickup'>('express');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('UPI');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Quick inline prescription file attachment if needed
  const [attachedRxName, setAttachedRxName] = useState<string>('Pre-verified Hospital Rx on file');

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];
  const subtotal = getSubtotal();
  const total = getTotal(deliveryMethod);
  const needsRx = requiresPrescription();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4 px-4">
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-xs text-slate-500">Please add items to proceed through checkout.</p>
        <Button onClick={() => navigate('/medicines')} variant="primary">
          Browse Medicines
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessingPayment(true);
    setPaymentError(null);

    setTimeout(() => {
      if (simulateFailure) {
        setIsProcessingPayment(false);
        setPaymentError(
          'Payment authorization failed: The simulated transaction was declined by bank gateway. Please select another payment method or uncheck simulate failure.'
        );
        return;
      }

      // Order generation
      const orderNum = `MED-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        createdAt: 'Just now',
        items: items.map((it) => ({
          productId: it.product.id,
          productName: it.product.name,
          genericName: it.product.genericName,
          price: it.product.sellingPrice,
          mrp: it.product.mrp,
          quantity: it.quantity,
          image: it.product.images[0],
          prescriptionRequired: it.product.prescriptionRequired,
        })),
        shippingAddress: selectedAddress,
        deliveryMethod: {
          id: deliveryMethod,
          title:
            deliveryMethod === 'standard'
              ? 'Standard Delivery'
              : deliveryMethod === 'express'
              ? 'Express Hospital Dispatch'
              : 'Hospital Pharmacy Counter Pickup',
          estimatedDays:
            deliveryMethod === 'express'
              ? 'Today by 7:00 PM'
              : deliveryMethod === 'hospital_pickup'
              ? 'In 30 Minutes'
              : '2 - 3 Days',
          price: getDeliveryFee(deliveryMethod),
        },
        paymentMethod: {
          type: paymentMethod,
          transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
          status: 'Success',
        },
        pricing: {
          subtotal,
          deliveryFee: getDeliveryFee(deliveryMethod),
          discount: getCouponDiscount(),
          total,
          couponCode: appliedCoupon || undefined,
        },
        currentStatus: 'Order Placed',
        timeline: [
          {
            status: 'Order Placed',
            timestamp: 'Just now',
            completed: true,
            current: true,
            description: 'Order confirmed with ApexCare Hospital Pharmacy.',
          },
          {
            status: 'Payment Confirmed',
            timestamp: 'In progress',
            completed: paymentMethod !== 'Cash on Delivery',
            current: false,
            description: `Payment settled via ${paymentMethod}.`,
          },
          {
            status: 'Pharmacist Approved',
            timestamp: 'Pending',
            completed: false,
            current: false,
            description: 'Prescription inspection by Chief Clinical Pharmacist.',
          },
          {
            status: 'Preparing Order',
            timestamp: 'Pending',
            completed: false,
            current: false,
            description: 'Batches scanned from temperature-controlled hospital cold-chain.',
          },
          {
            status: 'Packed',
            timestamp: 'Pending',
            completed: false,
            current: false,
            description: 'Sealed with tamper-evident medical barcode label.',
          },
          {
            status: 'Out for Delivery',
            timestamp: 'Pending',
            completed: false,
            current: false,
            description: 'Hospital courier rider dispatched.',
          },
          {
            status: 'Delivered',
            timestamp: 'Expected Today',
            completed: false,
            current: false,
            description: 'Doorstep handover with recipient OTP confirmation.',
          },
        ],
        prescriptionId: needsRx ? 'rx-auto-attached' : undefined,
        isPrescriptionVerified: !needsRx,
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessingPayment(false);
      navigate(`/order-success?orderId=${newOrder.orderNumber}`);
    }, 1200);
  };

  const steps = [
    { num: 1, title: 'Delivery Address', icon: MapPin },
    { num: 2, title: 'Delivery Method', icon: Truck },
    { num: 3, title: 'Payment & Confirm', icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb
        items={[{ label: 'Shopping Cart', href: '/cart' }, { label: 'Checkout' }]}
      />

      {/* Checkout Progress Stepper */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {steps.map((st) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            const Icon = st.icon;

            return (
              <div
                key={st.num}
                onClick={() => {
                  if (st.num < currentStep) setCurrentStep(st.num as any);
                }}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-2xl transition-all ${
                  isCurrent
                    ? 'bg-medical-50 text-medical-800 font-bold border border-medical-200'
                    : isCompleted
                    ? 'text-slate-700 cursor-pointer hover:bg-slate-50'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-medical-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                </div>
                <div className="min-w-0 hidden sm:block">
                  <div className="text-[11px] text-slate-400 font-medium">Step {st.num}</div>
                  <div className="text-xs font-bold truncate">{st.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Step Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: Address Selection */}
          {currentStep === 1 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    1. Select Delivery Address
                  </h3>
                  <p className="text-xs text-slate-500">
                    Medicines will be dispatched to this verified address
                  </p>
                </div>
                <Button
                  onClick={() => setIsAddressModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Address
                </Button>
              </div>

              {/* Address list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    isSelected={selectedAddressId === addr.id}
                    onSelect={() => setSelectedAddressId(addr.id)}
                    onDelete={
                      addresses.length > 1 ? () => deleteAddress(addr.id) : undefined
                    }
                  />
                ))}
              </div>

              {/* Prescription Attachment check if required */}
              {needsRx && (
                <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                    <FileUp className="w-4 h-4 text-teal-600" />
                    <span>Prescription Verification Ready</span>
                  </div>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    Your prescription will be matched with this address by the hospital pharmacy before delivery dispatch.
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedAddressId}
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2"
                >
                  <span>Continue to Delivery Method</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery Method */}
          {currentStep === 2 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  2. Choose Delivery Speed
                </h3>
                <p className="text-xs text-slate-500">
                  Delivering to: <span className="font-semibold text-slate-800">{selectedAddress.fullName}</span>, {selectedAddress.city} ({selectedAddress.pincode})
                </p>
              </div>

              <DeliveryMethodSelect
                selected={deliveryMethod}
                onSelect={setDeliveryMethod}
                subtotal={subtotal}
              />

              <div className="pt-4 flex justify-between items-center">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Address
                </Button>

                <Button
                  onClick={() => setCurrentStep(3)}
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment & Confirmation */}
          {currentStep === 3 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  3. Select Payment Method
                </h3>
                <p className="text-xs text-slate-500">
                  Secure and encrypted clinical payment gateway
                </p>
              </div>

              {paymentError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs text-red-700">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Transaction Alert</strong>
                    {paymentError}
                  </div>
                </div>
              )}

              <PaymentSelect
                selected={paymentMethod}
                onSelect={setPaymentMethod}
                simulateFailure={simulateFailure}
                setSimulateFailure={setSimulateFailure}
              />

              <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Change Delivery
                </Button>

                <Button
                  onClick={handlePlaceOrder}
                  isLoading={isProcessingPayment}
                  variant="primary"
                  size="lg"
                  className="shadow-lg shadow-medical-200 flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Place Hospital Order ({total === 0 ? 'FREE' : `₹${total}`})</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Order Summary */}
        <div className="lg:col-span-4 sticky top-36">
          <PriceSummary deliveryType={deliveryMethod} />
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={(newAddr) => {
          addAddress(newAddr);
        }}
      />
    </div>
  );
};
