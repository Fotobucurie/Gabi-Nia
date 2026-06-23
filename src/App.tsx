import React, { useState, useEffect, FormEvent } from 'react';
import { 
  Menu, 
  X, 
  Check, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  Star, 
  Activity, 
  Moon, 
  Sun, 
  ChevronRight, 
  Smile, 
  Award, 
  ShieldCheck, 
  Calendar, 
  User, 
  Mail, 
  FileText, 
  Heart,
  ArrowRight,
  Map,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import custom generated images
const heroBg = '/src/assets/images/cabinet_hero_bg_1782242762245.jpg';
const clinicImg = '/src/assets/images/gabriel_clinic_1782242774299.jpg';
const therapyImg = '/src/assets/images/gabriel_therapy_1782242793489.jpg';
const portraitImg = '/src/assets/images/gabriel_portrait_1782244743603.jpg';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
    style={props.style}
  >
    <path d="M12.031 2c-5.516 0-10 4.484-10 10 0 1.758.453 3.414 1.258 4.859L1.875 22.125l5.445-1.211c1.406.746 3.012 1.176 4.711 1.176 5.516 0 10-4.484 10-10s-4.484-10-10-10zm0 1.641c4.613 0 8.359 3.746 8.359 8.359s-3.746 8.359-8.359 8.359c-1.625 0-3.148-.469-4.445-1.277l-.32-.191-3.238.719.734-3.113-.211-.336a8.307 8.307 0 0 1-1.223-4.16c0-4.613 3.75-8.359 8.363-8.359zm-3.516 3.418c-.133 0-.324.051-.492.234-.168.18-.641.625-.641 1.523s.652 1.766.746 1.891c.094.125 1.285 1.961 3.117 2.75.438.191.777.305 1.043.391.438.141.836.121 1.152.074.352-.051 1.082-.441 1.234-.867.152-.426.152-.793.105-.867-.043-.078-.168-.125-.355-.219-.188-.094-1.082-.535-1.25-.598-.164-.059-.285-.094-.406.094-.121.188-.473.598-.578.719-.105.125-.211.141-.398.047-.188-.094-.793-.293-1.512-.934-.559-.496-.934-1.113-1.043-1.297-.109-.188-.012-.289.082-.383.086-.086.188-.219.281-.328.094-.109.125-.188.188-.313.063-.125.031-.234-.016-.328-.047-.094-.406-.98-.559-1.348-.148-.359-.301-.309-.41-.313z" />
  </svg>
);

// Define structures for our lists and services
interface Service {
  id: string;
  title: string;
  icon: any;
  shortDesc: string;
  duration: string;
  price: string;
  longDesc: string;
  benefits: string[];
}

const SERVICES: Service[] = [
  {
    id: 'masaj',
    title: 'Masaj',
    icon: Sparkles,
    shortDesc: 'De la relaxare profundă la masaj terapeutic pentru ameliorarea durerilor musculare.',
    duration: '50 / 80 minute',
    price: '150 / 220 RON',
    longDesc: 'O terapie manuală adaptată nevoilor tale, care combină tehnici de masaj de relaxare, masaj terapeutic și drenaj limfatic. Ideal pentru reducerea tensiunii musculare, îmbunătățirea circulației sanguine și relaxare psihică totală.',
    benefits: [
      'Ameliorează contracturile musculare dureroase',
      'Stimulează circulația limfatică și eliminarea toxinelor',
      'Reduce semnificativ nivelul de cortizol (hormonul stresului)',
      'Îmbunătățește flexibilitatea articulară generală'
    ]
  },
  {
    id: 'osteopatie',
    title: 'Osteopatie',
    icon: Activity,
    shortDesc: 'Restabilirea mobilității și funcționalității prin manipulări blânde ale sistemului osos.',
    duration: '60 minute',
    price: '200 RON',
    longDesc: 'Terapie holistică non-invazivă ce vizează diagnosticarea și tratarea disfuncțiilor de mobilitate la nivelul articulațiilor, mușchilor și ligamentelor. Gabriel folosește tehnici manuale precise pentru a reda corpului echilibrul structural și capacitatea de auto-vindecare.',
    benefits: [
      'Corectează disfuncțiile articulare și vertebrale',
      'Tratează durerile de spate, cervicale și lombare',
      'Ameliorează durerile de cap de origine tensională',
      'Restabilește echilibrul biomecanic natural'
    ]
  },
  {
    id: 'chiropractica',
    title: 'Chiropractică',
    icon: ShieldCheck,
    shortDesc: 'Ajustări precise ale coloanei vertebrale pentru eliminarea presiunii nervoase.',
    duration: '45 minute',
    price: '180 RON',
    longDesc: 'Chiropractica se concentrează pe corectarea subluxațiilor vertebrale și îmbunătățirea conexiunii sistemului nervos cu restul corpului. Prin impulsuri manuale rapide și sigure, se eliberează presiunea de la nivelul discurilor și nervilor.',
    benefits: [
      'Eliberează rapid presiunea de pe nervul sciatic',
      'Corectează aliniamentul coloanei vertebrale',
      'Îmbunătățește mobilitatea gâtului și a spatelui',
      'Crește performanța și reflexele sistemului nervos'
    ]
  },
  {
    id: 'evaluare',
    title: 'Evaluare',
    icon: FileText,
    shortDesc: 'Diagnosticare completă a posturii și a stării fizice înainte de orice tratament.',
    duration: '30 minute',
    price: '100 RON (Gratuit la pachet)',
    longDesc: 'O ședință inițială esențială în care se analizează postura corpului în dinamică și statică, se testează mobilitatea articulară și se determină zonele tensionate sau blocate. Pe baza acesteia se concepe un plan de tratament complet personalizat.',
    benefits: [
      'Identifică asimetriile musculare și posturale',
      'Depistează precoce disfuncțiile biomecanice',
      'Oferă un plan clar de intervenție terapeutică',
      'Include recomandări ergonomice pentru viața de zi cu zi'
    ]
  }
];

const BENEFITS = [
  {
    title: 'Mobilitate Sporită',
    desc: 'Redobândești libertatea de mișcare naturală.',
    icon: Activity
  },
  {
    title: 'Reducerea Stresului',
    desc: 'Eliberare mentală și relaxare profundă.',
    icon: BrainIcon
  },
  {
    title: 'Somn Odihnitor',
    desc: 'Îmbunătățirea calității repausului nocturn.',
    icon: Moon
  },
  {
    title: 'Energie Vitală',
    desc: 'Revigorare completă a sistemului nervos.',
    icon: Sun
  },
  {
    title: 'Recuperare Rapidă',
    desc: 'Ameliorarea post-efort sau post-traumatică.',
    icon: Sparkles
  },
  {
    title: 'Stare de Bine',
    desc: 'Armonie între starea fizică și cea emoțională.',
    icon: Smile
  }
];

function BrainIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  );
}

const TESTIMONIALS = [
  {
    initials: 'AM',
    name: 'Andrei Munteanu',
    role: 'Manager IT',
    text: '„După doar trei ședințe de osteopatie cu Gabriel, durerile cronice de spate care mă chinuiau de ani de zile au dispărut complet. Un profesionist desăvârșit!”'
  },
  {
    initials: 'EP',
    name: 'Elena Popescu',
    role: 'Arhitect',
    text: '„Masajul de relaxare aici este la un alt nivel. Atmosfera este incredibilă, iar Gabriel are o energie care te liniștește din prima clipă.”'
  },
  {
    initials: 'RD',
    name: 'Radu Drăgan',
    role: 'Sportiv',
    text: '„Evaluarea a fost foarte detaliată. Mi-a explicat exact de unde provin problemele mele de postură și am început imediat planul de tratament.”'
  }
];

// Helper to safely access localStorage without throwing SecurityError in restricted iframes
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("Storage access denied:", e);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("Storage access denied:", e);
    }
  }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Modals / Selection States
  const [activeServiceDetails, setActiveServiceDetails] = useState<Service | null>(null);
  const isBookingOpen = false;
  const setIsBookingOpen = (_open: boolean) => {};
  const selectedServiceId = '';
  const setSelectedServiceId = (_id: string) => {};
  const bookingStep: number = 1;
  const setBookingStep = (_step: number) => {};
  const bookingDate = '';
  const setBookingDate = (_date: string) => {};
  const bookingTime = '';
  const setBookingTime = (_time: string) => {};
  const formData = { name: '', phone: '', email: '', notes: '' };
  const setFormData = (_data: any) => {};
  const handleBookingSubmit = (e: any) => e.preventDefault();
  
  // Appointments storage
  const [myAppointments, setMyAppointments] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load local appointments safely
    const saved = safeStorage.getItem('cabinet_appointments');
    if (saved) {
      try {
        setMyAppointments(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCancelAppointment = (id: string) => {
    const filtered = myAppointments.filter(app => app.id !== id);
    setMyAppointments(filtered);
    safeStorage.setItem('cabinet_appointments', JSON.stringify(filtered));
  };

  // Generate date options for the next 10 work days
  const getDateOptions = () => {
    const options = [];
    const today = new Date();
    let count = 0;
    while (count < 10) {
      today.setDate(today.getDate() + 1);
      // Skip weekends
      if (today.getDay() !== 0 && today.getDay() !== 6) {
        const formattedDate = today.toLocaleDateString('ro-RO', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        });
        const iso = today.toISOString().split('T')[0];
        options.push({ iso, label: formattedDate });
        count++;
      }
    }
    return options;
  };

  const timeSlots = [
    '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30'
  ];

  return (
    <div className="min-h-screen bg-white text-[#2d3129] font-sans antialiased selection:bg-[#3c512c]/10 selection:text-[#3c512c]" id="home">
      
      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e6ead9]/50 py-3' : 'bg-white py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <a href="#home" className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-bold tracking-wider text-[#3c512c] uppercase">
              CABINET MASAJ PLOIEȘTI
            </span>
            <span className="text-[10px] md:text-xs tracking-widest text-[#6c805a] font-medium uppercase mt-0.5">
              Terapii Manuale & Recuperare
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#servicii" className="text-sm font-medium hover:text-[#3c512c] transition-colors">Servicii</a>
            <a href="#beneficii" className="text-sm font-medium hover:text-[#3c512c] transition-colors">Beneficii</a>
            <a href="#despre" className="text-sm font-medium hover:text-[#3c512c] transition-colors">Despre Gabriel</a>
            <a href="#testimoniale" className="text-sm font-medium hover:text-[#3c512c] transition-colors">Testimoniale</a>
            <a href="#contact" className="text-sm font-medium hover:text-[#3c512c] transition-colors">Contact</a>
          </nav>

          {/* Action Button & Responsive Menu Trigger */}
          <div className="flex items-center gap-4">
            {myAppointments.length > 0 && (
              <a 
                href="#programari" 
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#e6ead9] text-[#3c512c] rounded-md text-xs font-semibold hover:bg-[#d7dccb] transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3c512c]" />
                Programările mele ({myAppointments.length})
              </a>
            )}
            
            <a 
              id="cta-nav-booking"
              href="https://wa.me/40721550282"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3c512c] text-white rounded-md text-sm font-semibold hover:bg-[#2e3e22] transition-all duration-200 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              Mesaj WhatsApp
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2d3129] hover:text-[#3c512c] focus:outline-none"
              aria-label="Meniu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-[#e6ead9] px-5 py-6 overflow-hidden flex flex-col gap-4"
            >
              <a 
                href="#servicii" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-2 border-b border-[#faf9f6] text-[#2d3129]"
              >
                Servicii
              </a>
              <a 
                href="#beneficii" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-2 border-b border-[#faf9f6]"
              >
                Beneficii
              </a>
              <a 
                href="#despre" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-2 border-b border-[#faf9f6]"
              >
                Despre Gabriel
              </a>
              <a 
                href="#testimoniale" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-2 border-b border-[#faf9f6]"
              >
                Testimoniale
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-2 border-b border-[#faf9f6]"
              >
                Contact
              </a>

              {myAppointments.length > 0 && (
                <a 
                  href="#programari" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 bg-[#e6ead9] text-[#3c512c] rounded-md text-sm font-semibold"
                >
                  <span>Programările mele active</span>
                  <span className="bg-[#3c512c] text-white px-2 py-0.5 rounded-full text-xs">
                    {myAppointments.length}
                  </span>
                </a>
              )}

              <a 
                id="cta-mobile-booking"
                href="https://wa.me/40721550282"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#3c512c] text-white flex items-center justify-center gap-2 rounded-md font-semibold text-sm hover:bg-[#2e3e22] mt-2 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                Mesaj WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#faf9f6] flex items-center overflow-hidden">
        {/* Ambient background with warm texture */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img 
            src={heroBg} 
            alt="Cabinet Masaj Ploiesti Ambient" 
            className="w-full h-full object-cover object-center scale-105 filter blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#faf9f6]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tag / Category Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 bg-[#e6ead9]/80 border border-[#c1cab2]/30 backdrop-blur-sm rounded-full text-[11px] font-bold tracking-widest text-[#3c512c] uppercase"
              >
                RELAXARE | RECUPERARE | ECHILIBRU
              </motion.div>

              {/* Core Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#243019] leading-[1.12] tracking-tight"
              >
                Recâștigă echilibrul <br />
                dintre <span className="text-[#3c512c] italic font-serif">corp și minte.</span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base md:text-lg text-[#4a5243] leading-relaxed max-w-xl"
              >
                Experimentează terapii manuale de elită în inima Ploieștiului.
                Abordare personalizată bazată pe osteopatie, chiropractică și masaj terapeutic pentru sănătatea ta pe termen lung.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 items-stretch sm:items-center"
              >
                <a 
                  id="hero-primary-btn"
                  href="https://wa.me/40721550282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#3c512c] text-white rounded-md text-sm font-semibold hover:bg-[#2e3e22] transition-all duration-200 shadow-md text-center flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  Mesaj WhatsApp
                </a>
                
                <a 
                  href="tel:0722456789"
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-[#c1cab2] text-[#3c512c] rounded-md text-sm font-semibold hover:bg-white hover:text-[#2e3e22] transition-all duration-200 text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Sună acum
                </a>
              </motion.div>
            </div>

            {/* Right Column: Gabriel Portrait Image */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative max-w-sm w-full"
              >
                {/* Decorative background border outline accent */}
                <div className="absolute -inset-3 border border-[#c1cab2] rounded-2xl z-0 pointer-events-none translate-x-3 translate-y-3" />
                
                {/* Image frame */}
                <div className="relative z-10 overflow-hidden rounded-2xl bg-white border border-[#e6ead9] shadow-lg">
                  <img 
                    src={portraitImg} 
                    alt="Gabriel Nia - Specialist Recuperare si Osteopatie Ploiesti" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle info pill on the portrait image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#e6ead9]/80 p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div>
                      <span className="block font-serif text-sm font-bold text-[#243019]">Gabriel Nia</span>
                      <span className="block text-[10px] text-[#6c805a] uppercase font-semibold tracking-wider">Terapeut Specialist</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#e6ead9] text-[#3c512c] px-2.5 py-1 rounded-md text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      10+ Ani Exp.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: UN SPAȚIU DEDICAT VINDECĂRII */}
      <section className="py-20 md:py-28 bg-white border-b border-[#e6ead9]/30">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Content side */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#243019] leading-tight">
              Un spațiu dedicat vindecării
            </h2>
            
            <p className="text-base text-[#4a5243] leading-relaxed">
              Cabinetul nostru din Ploiești este conceput pentru a oferi o atmosferă de liniște și profesionalism, unde fiecare detaliu este gândit pentru confortul tău. Ne dorim ca fiecare vizită să fie o experiență de revigorare deplină, eliminând stresul acumulat și tensiunea zilnică.
            </p>

            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-[#e6ead9] rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#3c512c] stroke-[3]" />
                </div>
                <span className="font-semibold text-sm text-[#2d3129]">Echipamente profesionale</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-[#e6ead9] rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#3c512c] stroke-[3]" />
                </div>
                <span className="font-semibold text-sm text-[#2d3129]">Atmosferă relaxantă</span>
              </div>
            </div>
          </div>

          {/* Photo side */}
          <div className="lg:col-span-6">
            <div className="relative group">
              {/* Background accent block */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#3c512c]/5 to-[#c1cab2]/10 rounded-2xl blur-xl transition-all group-hover:scale-105 duration-300" />
              
              <div className="relative overflow-hidden rounded-xl border border-[#e6ead9] shadow-md bg-white">
                <img 
                  src={clinicImg} 
                  alt="Gabriel Nia Cabinet Masaj Ploiesti" 
                  className="w-full h-auto object-cover max-h-[450px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: CUM TE PUTEM AJUTA (SERVICES) */}
      <section className="py-20 md:py-28 bg-[#faf9f6]" id="servicii">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          {/* Header block with center line decoration */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#243019] mb-4">
              Cum te putem ajuta
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-[#3c512c] rounded-full mt-2" />
            </div>
          </div>

          {/* Grid of 4 beautiful cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const IconComp = service.icon;
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-lg p-8 border border-[#e6ead9]/60 hover:border-[#3c512c]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-lg bg-[#e6ead9]/50 flex items-center justify-center text-[#3c512c] mb-6 group-hover:bg-[#3c512c] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-5 h-5 stroke-[2]" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#243019] mb-3">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#596250] leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div>
                    <button 
                      onClick={() => setActiveServiceDetails(service)}
                      className="inline-flex items-center text-xs font-bold text-[#3c512c] tracking-wider uppercase hover:text-[#2e3e22] transition-colors gap-1 group/btn"
                    >
                      Detalii 
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: BENEFICII PENTRU VITALITATEA TA */}
      <section className="py-20 md:py-28 bg-white" id="beneficii">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Benefits List */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#243019] leading-tight">
              Beneficii pentru vitalitatea ta
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {BENEFITS.map((b, idx) => {
                const IconComp = b.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e6ead9]/40 border border-[#c1cab2]/20 flex items-center justify-center text-[#3c512c]">
                      <IconComp className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#243019] mb-1">
                        {b.title}
                      </h4>
                      <p className="text-xs text-[#596250] leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Masked Photo with Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative max-w-xs md:max-w-sm">
              
              {/* Organic/Circular Layout Wrapper with subtle plant background accent */}
              <div className="absolute -inset-4 bg-[#e6ead9]/30 rounded-full blur-2xl" />
              
              {/* Main Photo inside circular mask */}
              <div className="relative z-10 w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={therapyImg} 
                  alt="Terapie manuala Ploiesti" 
                  className="w-full h-full object-cover scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlaid green experience badge */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-[#3c512c] text-white px-5 py-4 rounded-lg shadow-lg max-w-[170px] text-left">
                <span className="block font-serif text-2xl font-bold leading-none mb-1">+10 ani</span>
                <span className="block text-[11px] text-[#e6ead9] tracking-wider uppercase font-semibold leading-tight">
                  Experiență Clinică
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: TERAPEUTUL TĂU - GABRIEL NIA */}
      <section className="py-20 md:py-28 bg-[#faf9f6]" id="despre">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Photo frame on left */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full">
              {/* Decorative border outline accent */}
              <div className="absolute -inset-3 border border-[#c1cab2] rounded-xl z-0 pointer-events-none translate-x-3 translate-y-3" />
              
              <div className="relative z-10 overflow-hidden rounded-xl bg-white border border-[#e6ead9] shadow-md">
                <img 
                  src={portraitImg} 
                  alt="Gabriel Nia - Specialist Recuperare si Osteopatie Ploiesti" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Description biography */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-bold tracking-widest text-[#6c805a] uppercase block">
              TERAPEUTUL TĂU
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#243019]">
              Gabriel Nia
            </h2>

            <div className="space-y-4 text-base text-[#4a5243] leading-relaxed">
              <p>
                Sunt pasionat de arta vindecării manuale și de modul în care echilibrul fizic influențează starea noastră generală de fericire. Cu o formare solidă în osteopatie și tehnici avansate de masaj, misiunea mea este să ofer fiecărui pacient o soluție personalizată.
              </p>
              <p>
                În cabinetul meu din Ploiești, am creat un spațiu unde timpul pară să se oprească, permițând corpului să înceapă propriul proces de regenerare. Nu tratăm doar simptomele, ci căutăm cauza profundă a disconfortului.
              </p>
            </div>

            {/* Certification Badge Block */}
            <div className="pt-4">
              <div className="flex items-start gap-4 p-5 bg-white border border-[#e6ead9] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#3c512c]/10 flex items-center justify-center text-[#3c512c] flex-shrink-0">
                  <Award className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#2d3129] mb-1">
                    Certificare Internațională
                  </h4>
                  <p className="text-xs text-[#6c805a]">
                    Membru al Asociației Române de Terapii Manuale
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: CE SPUN PACIENȚII NOȘTRI (TESTIMONIALS) */}
      <section className="py-20 md:py-28 bg-white" id="testimoniale">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          {/* Heading area with Rating summary */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#e6ead9]/50 pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#243019] mb-3">
                Ce spun pacienții noștri
              </h2>
              <p className="text-sm text-[#6c805a]">
                Rezultate care vorbesc de la sine.
              </p>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-3 bg-[#faf9f6] border border-[#e6ead9] px-4 py-2.5 rounded-lg">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#2d3129]">
                5.0 <span className="font-medium text-[#6c805a]">pe Google</span>
              </span>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx}
                className="bg-[#faf9f6] rounded-lg p-8 border border-[#e6ead9]/50 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  {/* Big Quote sign */}
                  <span className="font-serif text-[64px] font-bold leading-none text-[#3c512c]/10 absolute top-4 left-6 pointer-events-none selection:bg-transparent">
                    ”
                  </span>

                  <p className="text-sm text-[#4a5243] leading-relaxed italic relative z-10 pt-4 mb-8">
                    {t.text}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#e6ead9]/50">
                  <div className="w-10 h-10 rounded-full bg-[#e6ead9] flex items-center justify-center text-xs font-bold text-[#3c512c]">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#2d3129]">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#6c805a]">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DYNAMIC REGISTERED APPOINTMENTS TRACKER */}
      {myAppointments.length > 0 && (
        <section className="py-12 bg-[#e6ead9]/40 border-y border-[#e6ead9]" id="programari">
          <div className="max-w-4xl mx-auto px-5">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-[#3c512c]" />
              <h3 className="font-serif text-xl font-bold text-[#243019]">
                Programările mele solicitate
              </h3>
            </div>
            
            <div className="space-y-4">
              {myAppointments.map((app) => (
                <div key={app.id} className="bg-white rounded-lg p-5 border border-[#e6ead9] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#3c512c] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        Cod: {app.id}
                      </span>
                      <h4 className="font-bold text-sm text-[#243019]">{app.service}</h4>
                    </div>
                    <div className="text-xs text-[#596250] flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {getDateOptions().find(o => o.iso === app.date)?.label || app.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Ora {app.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {app.name}
                      </span>
                    </div>
                  </div>

                  <div>
                    <button 
                      onClick={() => handleCancelAppointment(app.id)}
                      className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-md"
                    >
                      Anulează solicitarea
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[11px] text-[#6c805a] mt-4 italic text-center">
              * Solicitările dvs. de programare sunt salvate local pe acest browser. Gabriel vă va contacta în scurt timp pentru confirmarea lor finală.
            </p>
          </div>
        </section>
      )}

      {/* SECTION: TE AȘTEPTĂM LA CABINET & VECTOR MAP */}
      <section className="py-20 bg-[#3c512c] text-white" id="contact">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          <div className="bg-white rounded-2xl p-6 md:p-10 lg:p-12 text-[#2d3129] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#243019] mb-3">
                  Te așteptăm la cabinet
                </h2>
                <p className="text-sm text-[#596250]">
                  Alege să investești în sănătatea ta astăzi pentru un mâine mai activ.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#faf9f6] border border-[#e6ead9] rounded-lg flex items-center justify-center text-[#3c512c]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#6c805a] mb-1">
                      Adresă
                    </h4>
                    <p className="text-sm text-[#2d3129] font-medium">
                      Strada Gheorghe Doja nr. 225, Ploiești
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#faf9f6] border border-[#e6ead9] rounded-lg flex items-center justify-center text-[#3c512c]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#6c805a] mb-1">
                      Telefon
                    </h4>
                    <p className="text-sm text-[#2d3129] font-medium">
                      0722 456 789
                    </p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#faf9f6] border border-[#e6ead9] rounded-lg flex items-center justify-center text-[#3c512c]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#6c805a] mb-1">
                      Program
                    </h4>
                    <p className="text-sm text-[#2d3129] font-medium">
                      Luni - Vineri: 09:00 - 20:00
                    </p>
                  </div>
                </div>

              </div>

              <div>
                <a 
                  id="cta-contact-booking"
                  href="https://wa.me/40721550282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#3c512c] text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-[#2e3e22] transition-colors shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  Mesaj WhatsApp
                </a>
              </div>
            </div>

            {/* Premium, Interactive Vector Map of Ploiesti */}
            <div className="lg:col-span-7 h-[300px] md:h-[400px] relative rounded-xl overflow-hidden border border-[#e6ead9] shadow-inner bg-[#f5f4f0]">
              {/* Custom detailed SVG map illustrating Ploiesti routes with high aesthetic precision */}
              <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                
                {/* Background color of styled map */}
                <rect width="800" height="600" fill="#f5f4f0" />

                {/* Parks / Green Areas */}
                <path d="M50 80 C 150 100, 180 50, 200 120 L 220 180 L 120 220 L 40 180 Z" fill="#e8eae1" />
                <path d="M520 140 C 580 150, 620 90, 680 100 L 720 200 L 620 240 Z" fill="#e8eae1" />
                <path d="M480 440 C 550 480, 580 520, 640 540 L 750 480 L 680 380 Z" fill="#e8eae1" />
                <circle cx="150" cy="450" r="80" fill="#e8eae1" />

                {/* Rivers / Creeks */}
                <path d="M-50 200 Q 150 220, 320 240 T 850 250" stroke="#d0d7cd" strokeWidth="4" fill="none" />
                <path d="M300 0 Q 340 180, 320 240 T 400 650" stroke="#d0d7cd" strokeWidth="2.5" fill="none" />

                {/* Roads / Streets grid */}
                {/* Major Highway (Strada Gheorghe Doja / Route 102) */}
                <path d="M400 -50 L 400 650" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
                <path d="M400 -50 L 400 650" stroke="#e0decb" strokeWidth="10" strokeLinecap="round" />

                {/* Centură Ploiești / Main Roads */}
                <path d="M-50 150 L 850 150" stroke="#ffffff" strokeWidth="8" />
                <path d="M-50 150 L 850 150" stroke="#e1dfcb" strokeWidth="6" />

                <path d="M-50 450 L 850 450" stroke="#ffffff" strokeWidth="8" />
                <path d="M-50 450 L 850 450" stroke="#e1dfcb" strokeWidth="6" />

                <path d="M200 -50 L 200 650" stroke="#ffffff" strokeWidth="6" />
                <path d="M200 -50 L 200 650" stroke="#e8e7da" strokeWidth="4.5" />

                <path d="M600 -50 L 600 650" stroke="#ffffff" strokeWidth="6" />
                <path d="M600 -50 L 600 650" stroke="#e8e7da" strokeWidth="4.5" />

                {/* Minor streets */}
                <line x1="100" y1="0" x2="100" y2="600" stroke="#ffffff" strokeWidth="4" />
                <line x1="100" y1="0" x2="100" y2="600" stroke="#f1f0e8" strokeWidth="2.5" />

                <line x1="300" y1="0" x2="300" y2="600" stroke="#ffffff" strokeWidth="4" />
                <line x1="300" y1="0" x2="300" y2="600" stroke="#f1f0e8" strokeWidth="2.5" />

                <line x1="500" y1="0" x2="500" y2="600" stroke="#ffffff" strokeWidth="4" />
                <line x1="500" y1="0" x2="500" y2="600" stroke="#f1f0e8" strokeWidth="2.5" />

                <line x1="700" y1="0" x2="700" y2="600" stroke="#ffffff" strokeWidth="4" />
                <line x1="700" y1="0" x2="700" y2="600" stroke="#f1f0e8" strokeWidth="2.5" />

                <path d="M0 100 L 800 500" stroke="#ffffff" strokeWidth="5" />
                <path d="M0 100 L 800 500" stroke="#e8e7da" strokeWidth="3.5" />

                <path d="M0 500 L 800 100" stroke="#ffffff" strokeWidth="5" />
                <path d="M0 500 L 800 100" stroke="#e8e7da" strokeWidth="3.5" />

                {/* Landmark Texts / Labels */}
                <text x="250" y="80" fill="#6c805a" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold">Păulești</text>
                <text x="680" y="70" fill="#6c805a" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold">Blejoi</text>
                <text x="80" y="140" fill="#6c805a" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold">Strejnicu</text>
                <text x="690" y="475" fill="#6c805a" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold">Bărcănești</text>
                <text x="650" y="550" fill="#6c805a" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold">Ghighiu</text>
                
                {/* Central landmarks */}
                <text x="420" y="175" fill="#2d3129" fontFamily="var(--font-sans)" fontSize="11" fontWeight="bold">AFI Ploiești</text>
                <text x="420" y="320" fill="#2d3129" fontFamily="var(--font-sans)" fontSize="11" fontWeight="bold">PLOIEȘTI CENTRU</text>
                <text x="420" y="440" fill="#2d3129" fontFamily="var(--font-sans)" fontSize="10" fontWeight="600">Gara de Sud</text>

                {/* Route markers */}
                <rect x="520" y="35" width="28" height="15" rx="3" fill="#a4af94" />
                <text x="526" y="46" fill="#ffffff" fontFamily="var(--font-sans)" fontSize="9" fontWeight="bold">DN1</text>

                <rect x="350" y="25" width="28" height="15" rx="3" fill="#a4af94" />
                <text x="354" y="36" fill="#ffffff" fontFamily="var(--font-sans)" fontSize="9" fontWeight="bold">102</text>

                {/* Cabinet Masaj Ploiesti Marker Pin - Strada Gheorghe Doja */}
                {/* Coordinates placed on Strada Gheorghe Doja 225 */}
                <g transform="translate(400, 240)">
                  {/* Pulse rings */}
                  <circle cx="0" cy="0" r="16" fill="#3c512c" opacity="0.15">
                    <animate attributeName="r" values="8;24;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="28" fill="#3c512c" opacity="0.05">
                    <animate attributeName="r" values="12;36;12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Pin Drop */}
                  <path d="M 0 0 C -8 -8, -12 -16, -12 -24 A 12 12 0 1 1 12 -24 C 12 -16, 8 -8, 0 0 Z" fill="#3c512c" />
                  <circle cx="0" cy="-24" r="5" fill="#ffffff" />
                  
                  {/* Label overlay popup */}
                  <g transform="translate(18, -32)">
                    <rect x="-5" y="-12" width="165" height="26" rx="4" fill="#ffffff" stroke="#3c512c" strokeWidth="1.5" />
                    <text x="5" y="5" fill="#3c512c" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold">CABINET GABRIEL NIA</text>
                  </g>
                </g>

              </svg>
              
              {/* Corner Map Info Button */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-[#e6ead9] px-3 py-1.5 rounded text-[10px] font-semibold text-[#3c512c] flex items-center gap-1">
                <Map className="w-3 h-3" />
                Hartă Interactivă Ploiești
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#243019] text-white py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col items-center text-center space-y-8">
          
          <div className="flex flex-col items-center">
            <span className="font-serif text-xl font-bold tracking-wider uppercase mb-1">
              CABINET MASAJ PLOIEȘTI
            </span>
            <span className="text-xs text-[#a4af94] uppercase tracking-widest">
              Gabriel Nia | Specialist Recuperare & Terapie Manuală
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#ccd5c3]">
            <a href="#home" className="hover:text-white transition-colors">Acasă</a>
            <a href="#servicii" className="hover:text-white transition-colors">Servicii</a>
            <a href="#beneficii" className="hover:text-white transition-colors">Beneficii</a>
            <a href="#despre" className="hover:text-white transition-colors">Despre Gabriel</a>
            <a href="#testimoniale" className="hover:text-white transition-colors">Testimoniale</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="w-full max-w-md h-px bg-[#a4af94]/10" />

          {/* Regulatory links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#a4af94]">
            <a href="#" className="hover:text-white transition-colors">Politica de Confidențialitate</a>
            <span className="text-[#a4af94]/30">|</span>
            <a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a>
            <span className="text-[#a4af94]/30">|</span>
            <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANPC</a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full border border-[#a4af94]/20 flex items-center justify-center hover:bg-white/5 hover:border-white transition-all text-[#ccd5c3] hover:text-white"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.4-5 4v2z" />
              </svg>
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full border border-[#a4af94]/20 flex items-center justify-center hover:bg-white/5 hover:border-white transition-all text-[#ccd5c3] hover:text-white"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-[#a4af94]/60">
            &copy; {new Date().getFullYear()} Cabinet Masaj Ploiești - Gabriel Nia. Toate drepturile rezervate.
          </p>

        </div>
      </footer>


      {/* INTERACTIVE COMPONENT: SERVICE DETAILS DRAWER/MODAL */}
      <AnimatePresence>
        {activeServiceDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveServiceDetails(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-[#e6ead9] max-h-[90vh] flex flex-col"
            >
              <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#e6ead9]/50 flex items-center justify-center text-[#3c512c]">
                      {(() => {
                        const Icon = activeServiceDetails.icon;
                        return <Icon className="w-5 h-5" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#243019]">
                        {activeServiceDetails.title}
                      </h3>
                      <span className="text-xs text-[#6c805a]">Specialitate Cabinet</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveServiceDetails(null)}
                    className="p-1 rounded-full hover:bg-[#faf9f6] text-[#6c805a]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#faf9f6] rounded-lg border border-[#e6ead9]/50">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#6c805a] tracking-wider">Durată Ședință</span>
                    <span className="text-sm font-semibold text-[#2d3129] flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#3c512c]" />
                      {activeServiceDetails.duration}
                    </span>
                  </div>
                  
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#6c805a] tracking-wider">Tarif</span>
                    <span className="text-sm font-semibold text-[#2d3129] flex items-center gap-1.5 mt-0.5">
                      <Heart className="w-3.5 h-3.5 text-[#3c512c]" />
                      {activeServiceDetails.price}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#6c805a] tracking-wider mb-2">Despre Terapie</h4>
                  <p className="text-sm text-[#4a5243] leading-relaxed">
                    {activeServiceDetails.longDesc}
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-semibold text-[#6c805a] tracking-wider">Beneficii Directe</h4>
                  <div className="space-y-2">
                    {activeServiceDetails.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#2d3129]">
                        <Check className="w-4 h-4 text-[#3c512c] stroke-[2.5] flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action buttons at bottom */}
              <div className="p-4 bg-[#faf9f6] border-t border-[#e6ead9] flex gap-3">
                <button 
                  onClick={() => setActiveServiceDetails(null)}
                  className="flex-1 py-3 border border-[#c1cab2] text-[#2d3129] rounded-md text-xs font-semibold hover:bg-[#e6ead9]/20 transition-colors"
                >
                  Închide
                </button>
                <a 
                  href="https://wa.me/40721550282"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveServiceDetails(null)}
                  className="flex-1 py-3 bg-[#3c512c] text-white rounded-md text-xs font-semibold hover:bg-[#2e3e22] transition-all flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  Mesaj WhatsApp
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* INTERACTIVE COMPONENT: BOOKING FLOW MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-[#e6ead9] max-h-[92vh] flex flex-col"
            >
              
              {/* Header */}
              <div className="p-5 border-b border-[#e6ead9] bg-[#faf9f6] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#243019]">
                    Solicitare Programare Cabinet
                  </h3>
                  <p className="text-xs text-[#6c805a]">Urmați pașii pentru programare rapidă</p>
                </div>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="p-1 rounded-full hover:bg-[#e6ead9] text-[#6c805a] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Steps Progress Bar */}
              {bookingStep <= 3 && (
                <div className="px-6 py-3 bg-[#e6ead9]/30 border-b border-[#e6ead9]/50 flex items-center justify-between text-xs font-semibold text-[#6c805a]">
                  <span className={bookingStep === 1 ? 'text-[#3c512c] font-bold' : ''}>1. Serviciu</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#c1cab2]" />
                  <span className={bookingStep === 2 ? 'text-[#3c512c] font-bold' : ''}>2. Dată & Oră</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#c1cab2]" />
                  <span className={bookingStep === 3 ? 'text-[#3c512c] font-bold' : ''}>3. Date Contact</span>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleBookingSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* STEP 1: Select Service */}
                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#6c805a]">
                      Alegeți serviciul dorit:
                    </label>
                    
                    <div className="space-y-3">
                      {SERVICES.map((s) => {
                        const Icon = s.icon;
                        const isSelected = selectedServiceId === s.id;
                        return (
                          <div 
                            key={s.id}
                            onClick={() => setSelectedServiceId(s.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${
                              isSelected 
                                ? 'border-[#3c512c] bg-[#e6ead9]/30' 
                                : 'border-[#e6ead9] hover:border-[#c1cab2] bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${isSelected ? 'bg-[#3c512c] text-white' : 'bg-[#e6ead9]/50 text-[#3c512c]'}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-[#2d3129]">{s.title}</h4>
                                <span className="text-[11px] text-[#6c805a]">{s.duration} | {s.price}</span>
                              </div>
                            </div>
                            <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#3c512c] bg-[#3c512c]' : 'border-[#c1cab2]'}`}>
                              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Choose Date & Time */}
                {bookingStep === 2 && (
                  <div className="space-y-6">
                    {/* Date Selector */}
                    <div className="space-y-3">
                      <label className="block text-xs uppercase font-bold tracking-wider text-[#6c805a]">
                        Selectați o zi (Luni - Vineri):
                      </label>
                      <div className="grid grid-cols-1 gap-2 max-h-[180px] overflow-y-auto pr-1">
                        {getDateOptions().map((opt) => (
                          <div 
                            key={opt.iso}
                            onClick={() => setBookingDate(opt.iso)}
                            className={`p-3 rounded-lg border cursor-pointer text-xs font-semibold transition-all ${
                              bookingDate === opt.iso 
                                ? 'border-[#3c512c] bg-[#3c512c] text-white' 
                                : 'border-[#e6ead9] hover:border-[#c1cab2] bg-white text-[#2d3129]'
                            }`}
                          >
                            {opt.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time Slot Selector */}
                    {bookingDate && (
                      <div className="space-y-3">
                        <label className="block text-xs uppercase font-bold tracking-wider text-[#6c805a]">
                          Selectați intervalul orar disponibil:
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((slot) => (
                            <div 
                              key={slot}
                              onClick={() => setBookingTime(slot)}
                              className={`p-2.5 rounded-md border cursor-pointer text-center text-xs font-bold transition-all ${
                                bookingTime === slot 
                                  ? 'border-[#3c512c] bg-[#3c512c] text-white' 
                                  : 'border-[#e6ead9] hover:border-[#c1cab2] bg-white text-[#2d3129]'
                              }`}
                            >
                              {slot}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Enter Customer Information */}
                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#6c805a] mb-2">
                      Datele de contact ale pacientului:
                    </label>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#596250] mb-1">Nume Complet</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#6c805a] absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Popescu Ion"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-[#c1cab2] rounded-md text-sm outline-none focus:border-[#3c512c] focus:ring-1 focus:ring-[#3c512c] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#596250] mb-1">Număr de Telefon</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#6c805a] absolute left-3 top-3.5" />
                          <input 
                            type="tel" 
                            required
                            placeholder="Ex: 0722 123 456"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-[#c1cab2] rounded-md text-sm outline-none focus:border-[#3c512c] focus:ring-1 focus:ring-[#3c512c] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#596250] mb-1">Email (Opțional)</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#6c805a] absolute left-3 top-3.5" />
                          <input 
                            type="email" 
                            placeholder="Ex: popescu.ion@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-[#c1cab2] rounded-md text-sm outline-none focus:border-[#3c512c] focus:ring-1 focus:ring-[#3c512c] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#596250] mb-1">Observații / Dureri cronice semnalate (Opțional)</label>
                        <textarea 
                          rows={2}
                          placeholder="Ex: Sufăr de hernie de disc / dureri cervicale persistente..."
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          className="w-full p-3 bg-white border border-[#c1cab2] rounded-md text-sm outline-none focus:border-[#3c512c] focus:ring-1 focus:ring-[#3c512c] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Success Ticket */}
                {bookingStep === 4 && (
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 bg-[#e6ead9] text-[#3c512c] rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl font-bold text-[#243019]">
                        Solicitare Înregistrată!
                      </h4>
                      <p className="text-sm text-[#596250] max-w-sm mx-auto">
                        Gabriel te va contacta telefonic în cel mai scurt timp pentru confirmarea datei și stabilirea detaliilor finale.
                      </p>
                    </div>

                    {/* Summary ticket */}
                    <div className="p-5 bg-[#faf9f6] border border-[#e6ead9] rounded-lg text-left text-xs space-y-3 max-w-md mx-auto">
                      <div className="flex justify-between pb-2 border-b border-[#e6ead9] font-bold">
                        <span className="text-[#6c805a]">SERVICIU SOLICITAT</span>
                        <span className="text-[#3c512c]">
                          {SERVICES.find(s => s.id === selectedServiceId)?.title}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-[#6c805a]">PACIENT</span>
                        <span className="font-semibold text-[#2d3129]">{formData.name}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6c805a]">TELEFON</span>
                        <span className="font-semibold text-[#2d3129]">{formData.phone}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6c805a]">DATA PROPUSĂ</span>
                        <span className="font-semibold text-[#2d3129]">
                          {getDateOptions().find(o => o.iso === bookingDate)?.label || bookingDate}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6c805a]">INTERVAL PROPUS</span>
                        <span className="font-semibold text-[#2d3129]">Ora {bookingTime}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#6c805a] italic">
                      * Solicitarea a fost salvată în siguranță în browser-ul dvs.
                    </p>
                  </div>
                )}

              </form>

              {/* Action buttons footer */}
              <div className="p-4 bg-[#faf9f6] border-t border-[#e6ead9] flex justify-between gap-3">
                {bookingStep === 1 && (
                  <>
                    <button 
                      type="button"
                      onClick={() => setIsBookingOpen(false)}
                      className="flex-1 py-3 border border-[#c1cab2] text-[#2d3129] rounded-md text-xs font-semibold hover:bg-white"
                    >
                      Anulează
                    </button>
                    <button 
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="flex-1 py-3 bg-[#3c512c] text-white rounded-md text-xs font-semibold hover:bg-[#2e3e22] transition-colors"
                    >
                      Continuă
                    </button>
                  </>
                )}

                {bookingStep === 2 && (
                  <>
                    <button 
                      type="button"
                      onClick={() => setBookingStep(1)}
                      className="flex-1 py-3 border border-[#c1cab2] text-[#2d3129] rounded-md text-xs font-semibold hover:bg-white"
                    >
                      Înapoi
                    </button>
                    <button 
                      type="button"
                      disabled={!bookingDate || !bookingTime}
                      onClick={() => setBookingStep(3)}
                      className={`flex-1 py-3 rounded-md text-xs font-semibold transition-colors ${
                        bookingDate && bookingTime 
                          ? 'bg-[#3c512c] text-white hover:bg-[#2e3e22]' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Continuă
                    </button>
                  </>
                )}

                {bookingStep === 3 && (
                  <>
                    <button 
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="flex-1 py-3 border border-[#c1cab2] text-[#2d3129] rounded-md text-xs font-semibold hover:bg-white"
                    >
                      Înapoi
                    </button>
                    <button 
                      type="submit"
                      disabled={!formData.name || !formData.phone}
                      onClick={handleBookingSubmit}
                      className={`flex-1 py-3 rounded-md text-xs font-semibold transition-colors ${
                        formData.name && formData.phone 
                          ? 'bg-[#3c512c] text-white hover:bg-[#2e3e22]' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Trimite Solicitarea
                    </button>
                  </>
                )}

                {bookingStep === 4 && (
                  <button 
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="w-full py-3 bg-[#3c512c] text-white rounded-md text-xs font-semibold hover:bg-[#2e3e22] transition-all text-center"
                  >
                    Am înțeles, mulțumesc!
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
