import React, { Fragment, useState } from 'react';

interface VipRsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VipRsvpModal: React.FC<VipRsvpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    tablePreference: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // For now, let's just log the data and close the modal
    console.log('Reservation Data:', formData);

    const message = `*VIP Reservation Request*%0A%0A` +
                    `Name: ${formData.name}%0A` +
                    `Phone: ${formData.phone}%0A` +
                    `Date: ${formData.date}%0A` +
                    `VIP Table Preference: ${formData.tablePreference}`;
    
    window.open(`https://wa.me/256749575778?text=${message}`, ", _blank");

    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="relative bg-zinc-900 border border-gold/30 rounded-lg shadow-xl max-w-md w-full p-8 space-y-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gold transition-colors text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-gold text-center mb-6">VIP Reservation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border-b border-white/20 focus:border-gold-500 focus:outline-none text-white placeholder-zinc-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border-b border-white/20 focus:border-gold-500 focus:outline-none text-white placeholder-zinc-500"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border-b border-white/20 focus:border-gold-500 focus:outline-none text-white placeholder-zinc-500 [&::-webkit-calendar-picker-indicator]:invert"
            required
          />
          <select
            name="tablePreference"
            value={formData.tablePreference}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border-b border-white/20 focus:border-gold-500 focus:outline-none text-white placeholder-zinc-500 [&>option]:bg-zinc-800"
            required
          >
            <option value="" disabled>Select VIP Table Preference</option>
            <option value="Standard VIP">Standard VIP</option>
            <option value="Executive Lounge">Executive Lounge</option>
            <option value="Private Booth">Private Booth</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition shadow-[0_0_15px_rgba(255,215,0,0.5)]"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default VipRsvpModal;
