import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import VipRsvpModal from '../components/VipRsvpModal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const [activeTab, setActiveTab] = useState('Starters');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const container = useRef(null);

  useGSAP(() => {
    // Hero Animation
    gsap.fromTo('#hero > *', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    // Menu Animation
    gsap.from('#menu-items > div', {
      scrollTrigger: {
        trigger: '#menu',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, { scope: container, dependencies: [activeTab] });

  const menuData = {
    Starters: [
      { name: 'Chimichurri Prawns', description: 'sautéed with garlic and onions', price: 'UGX 45,000' },
      { name: 'Smoked Salmon Carpaccio', description: 'on garlic crostini', price: 'UGX 55,000' },
      { name: 'Braised Short Rib Croquettes', description: 'served with house aioli', price: 'UGX 40,000' },
    ],
    Mains: [
      { name: 'Beef Ragout Linguine', description: 'slow-cooked tender beef ragout', price: 'UGX 65,000' },
      { name: 'Mushroom & Mixed Sea Food Risotto', description: 'creamy arborio rice', price: 'UGX 75,000' },
      { name: 'Premium BBQ Grill Platters', description: 'selection of prime meats', price: 'UGX 120,000' },
    ],
    'Bottle Service': [
      { name: 'Premium Spirits', description: 'curated selection of top-shelf spirits', price: 'From UGX 100,000' },
      { name: 'Champagne Packages', description: 'curated selection of champagne', price: 'From UGX 500,000' },
      { name: 'Exclusive VIP Tiers', description: 'bespoke service for the elite', price: 'On Request' },
    ]
  };

  return (
    <div ref={container} className="min-h-screen bg-black text-white font-sans">
      <nav className="fixed w-full z-50 p-6 flex justify-between items-center border-b border-gold/20 bg-black/80 backdrop-blur-sm">
        <div className="text-xl font-bold text-gold tracking-widest truncate">BLACK PANTHER</div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
          <a href="#about" className="hover:text-gold transition">About</a>
          <a href="#menu" className="hover:text-gold transition">Menu</a>
          <a href="#gallery" className="hover:text-gold transition">Gallery</a>
          <a href="#reservations" className="hover:text-gold transition">RSVP</a>
        </div>
        <div className="md:hidden text-gold">
          <Link href="#menu">MENU</Link>
        </div>
      </nav>

      <section id="hero" className="min-h-[80vh] relative overflow-hidden flex flex-col justify-center items-center text-center p-6">
        <Image 
          src="/hero.png" 
          alt="Hero" 
          fill 
          priority 
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/80 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-tighter">BLACK PANTHER<br/><span className="text-gold">KAMPALA</span></h1>
          <p className="text-xl md:text-2xl mb-10 text-zinc-400">Redefining Kampala's Night Life & Dining Experience</p>
          <button onClick={() => setIsModalOpen(true)} className="cta-button px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition shadow-[0_0_15px_rgba(255,215,0,0.5)]">VIP RSVP</button>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gold">The Experience</h2>
          <p className="text-zinc-300 text-lg leading-relaxed">
            Welcome to the pinnacle of luxury. Black Panther Kampala offers a frictionless, premium lounge environment designed for the elite. 
            From our curated ambiance to our world-class service, every detail is crafted to provide an unparalleled nightlife and dining experience.
          </p>
        </div>
      </section>

      <section id="menu" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gold text-center">Culinary & Mixology</h2>
          
          <div className="flex justify-center space-x-12 mb-16 border-b border-gold/30 pb-6">
            {Object.keys(menuData).map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 ${activeTab === tab ? 'text-gold border-gold' : 'text-zinc-500 border-transparent hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div id="menu-items" className="space-y-10">
            {menuData[activeTab as keyof typeof menuData].map((item, index) => (
              <div key={index} className="flex justify-between items-baseline group border-b border-zinc-900 pb-6">
                <div>
                  <h4 className="text-2xl font-light text-white mb-1 group-hover:text-gold transition-colors duration-300">{item.name}</h4>
                  <p className="text-zinc-500 text-sm italic">{item.description}</p>
                </div>
                <span className="text-gold font-bold tracking-widest text-lg">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 px-6">
        <h2 className="text-4xl font-bold mb-12 text-gold text-center">Atmosphere Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {[ 
            { src: '/hero.png', alt: 'Hero Section' },
            { src: '/interior.png', alt: 'Interior Design' },
            { src: '/logo.jpg', alt: 'Black Panther Logo' },
            { src: '/space.png', alt: 'Space View' },
          ].map((image, index) => (
            <div key={index} className="relative overflow-hidden aspect-video rounded-xl border border-white/10 bg-white/5 backdrop-blur-md group">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          ))}
        </div>
      </section>

      <section id="reservations" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gold text-center">VIP Table Reservations</h2>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const data = Object.fromEntries(formData.entries());
              
              if (!data.name || !data.phone || !data.date || !data.guests || !data.type) {
                alert('Please fill in all fields');
                return;
              }

              const message = `*VIP Reservation Request*%0A%0A` +
                              `Name: ${data.name}%0A` +
                              `Phone: ${data.phone}%0A` +
                              `Date: ${data.date}%0A` +
                              `Guests: ${data.guests}%0A` +
                              `Experience: ${data.type}`;
              
              window.open(`https://wa.me/256749575778?text=${message}`, '_blank');
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-6"
          >
            <input type="text" name="name" placeholder="Full Name" className="w-full p-4 bg-black border border-gold/30 text-white focus:outline-none focus:border-gold" required />
            <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-4 bg-black border border-gold/30 text-white focus:outline-none focus:border-gold" required />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input 
                  type="date" 
                  name="date" 
                  defaultValue="2026-04-22"
                  className="w-full p-4 bg-black border border-gold/30 text-white focus:outline-none focus:border-gold [&::-webkit-calendar-picker-indicator]:invert" 
                  required 
                />
                <span className="absolute -top-3 left-2 text-[10px] text-gold uppercase bg-zinc-950 px-1">Grand Opening</span>
              </div>
              <input type="number" name="guests" placeholder="Guest Count" className="w-full p-4 bg-black border border-gold/30 text-white focus:outline-none focus:border-gold" required />
            </div>
            
            <select name="type" className="w-full p-4 bg-black border border-gold/30 text-zinc-400 focus:outline-none focus:border-gold" required defaultValue="">
              <option value="" disabled>Select Experience Type</option>
              <option value="Dinner">Dinner</option>
              <option value="Bottle Service">Bottle Service</option>
              <option value="Private Event">Private Event</option>
            </select>
            
            <button type="submit" className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition cursor-pointer">Confirm Reservation</button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gold/20 text-center">
        <p className="text-gold font-bold mb-4">Bukoto-Kisaasi, Kisota Rd, Kampala</p>
        <p className="text-zinc-500 text-sm">Partners: Fenon Premium Events Production | Bazi Glam Events</p>
      </footer>

      <VipRsvpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
