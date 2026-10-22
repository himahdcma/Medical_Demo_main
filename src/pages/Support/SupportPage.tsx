import React, { useState } from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { FAQS } from '../../data/faqs';
import { Button } from '../../components/common/Button';
import {
  HelpCircle,
  Search,
  ChevronDown,
  PhoneCall,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id || null);

  // Ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Order Support');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isTicketSubmitted, setIsTicketSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  const categories = ['All', 'Prescription', 'Delivery', 'Orders', 'Payments', 'Medicines', 'Returns', 'Account'];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketRef(`TKT-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsTicketSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <Breadcrumb items={[{ label: '24/7 Patient Support & FAQs' }]} />

      {/* Header & Search */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-3 py-1 rounded-full border border-medical-200">
          Hospital Help Center
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How can our pharmacy team assist you?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Find answers regarding prescription verification, delivery tracking, drug interactions, or raise a clinical support ticket.
        </p>

        {/* Search FAQ */}
        <div className="relative max-w-md mx-auto pt-2">
          <input
            type="text"
            placeholder="Search help topics (e.g. Prescription, Delivery)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-5.5" />
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-medical-50 text-medical-600 flex items-center justify-center mx-auto">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Hospital Helpline</h4>
          <p className="text-xs text-slate-500">Toll-free 24/7 pharmacy queries</p>
          <a
            href="tel:18004198800"
            className="font-extrabold text-sm text-medical-700 block hover:underline"
          >
            1800-419-8800
          </a>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">WhatsApp Prescription Line</h4>
          <p className="text-xs text-slate-500">Quick Rx confirmation via chat</p>
          <a
            href="https://wa.me/919440123456"
            target="_blank"
            rel="noreferrer"
            className="font-extrabold text-sm text-teal-700 block hover:underline"
          >
            +91 94401 23456
          </a>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Email Clinical Support</h4>
          <p className="text-xs text-slate-500">Response within 2 hours</p>
          <a
            href="mailto:pharmacy@apexcarehospital.org"
            className="font-extrabold text-xs text-emerald-700 block hover:underline truncate"
          >
            pharmacy@apexcarehospital.org
          </a>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">
              Clear clinical guidelines for our digital hospital pharmacy
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-medical-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-medical-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-medical-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Ticket Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            Submit a Patient Support Ticket
          </h3>
          <p className="text-xs text-slate-500">
            Have a question about an active order, prescription review, or medical refund?
          </p>
        </div>

        {isTicketSubmitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-950">
              Ticket Logged Successfully (#{ticketRef})
            </h4>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              Our clinical care desk has received your inquiry. A clinical pharmacist or support representative will contact you via phone or email within 2 hours.
            </p>
            <Button
              onClick={() => {
                setIsTicketSubmitted(false);
                setTicketSubject('');
                setTicketMessage('');
              }}
              variant="outline"
              size="sm"
            >
              Submit Another Inquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Support Category *
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none bg-white"
                >
                  <option value="Order Support">Order Tracking & Dispatch</option>
                  <option value="Prescription Audit">Prescription Review & Clarification</option>
                  <option value="Drug Consultation">Clinical Pharmacist Guidance</option>
                  <option value="Billing & Refunds">Billing & Refund Inquiry</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Subject / Order Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiring about Order #MED-20260924-001"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Message Details *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your inquiry with as much detail as possible..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Submit Ticket to Clinical Desk</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
