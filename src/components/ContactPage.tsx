import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
} from 'lucide-react';
import { CONTACT_INFO, CORE_SERVICES } from '../data/siteData';

interface ContactPageProps {
  prefillService?: string | null;
}

interface FormState {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const SERVICE_OPTIONS = [
  ...CORE_SERVICES.map((s) => s.title),
  'Comprehensive Condition Monitoring Program',
  'General Reliability Consultation',
];

export function ContactPage({ prefillService }: ContactPageProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: prefillService || SERVICE_OPTIONS[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedPayload, setSubmittedPayload] = useState<FormState | null>(null);

  useEffect(() => {
    if (prefillService) {
      setForm((prev) => ({ ...prev, serviceRequired: prefillService }));
    }
  }, [prefillService]);

  const validate = (data: FormState): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!data.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!data.email.trim()) {
      nextErrors.email = 'Please enter your business email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!data.phone.trim()) {
      nextErrors.phone = 'Please enter your contact phone number.';
    } else if (data.phone.replace(/[^\d+]/g, '').length < 7) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!data.message.trim()) {
      nextErrors.message = 'Please briefly describe your equipment or service requirement.';
    }
    return nextErrors;
  };

  const buildFormattedBody = (data: FormState) => {
    return [
      `New Service Enquiry — TM Industrial Solution`,
      `----------------------------------------`,
      `Name: ${data.name}`,
      `Company: ${data.companyName || 'Not specified'}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service Required: ${data.serviceRequired}`,
      ``,
      `Message:`,
      data.message,
    ].join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setSubmittedPayload({ ...form });
  };

  const getMailtoHref = (data: FormState) => {
    const subject = encodeURIComponent(
      `Service Enquiry: ${data.serviceRequired} — ${data.companyName || data.name}`
    );
    const body = encodeURIComponent(buildFormattedBody(data));
    return `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppHref = (data?: FormState) => {
    const text = data
      ? encodeURIComponent(buildFormattedBody(data))
      : encodeURIComponent(
          'Hello TM Industrial Solution, I would like to enquire about your industrial condition monitoring and reliability services.'
        );
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="pt-20">
      {/* Contact Header Banner */}
      <section className="relative bg-[#071D36] text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-engineering-grid opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F5B51B] mb-4">
              Direct Engineering Support
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white mb-5">
              LET&apos;S <span className="text-[#F5B51B]">CONNECT.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Reach out to discuss vibration analysis, laser shaft alignment, oil diagnostics,
              dynamic balancing, thermography, or plant-wide troubleshooting support.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-44 h-2 tm-diagonal-accent" aria-hidden="true" />
      </section>

      {/* Main Contact Grid: Direct Channels + Enquiry Form */}
      <section className="bg-[#F4F6F9] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Direct Contact Details & WhatsApp CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-7 sm:p-8">
                <h2 className="font-display font-bold text-2xl text-[#071D36] mb-6">
                  Direct Contact Details
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Contact Person
                      </p>
                      <p className="font-display font-bold text-lg text-[#071D36]">
                        {CONTACT_INFO.contactPerson}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Phone
                      </p>
                      <a
                        href={CONTACT_INFO.phoneHref}
                        className="font-mono font-semibold text-base text-[#071D36] hover:text-[#D4960B] transition-colors tabular-nums"
                      >
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Email
                      </p>
                      <a
                        href={CONTACT_INFO.emailHref}
                        className="font-medium text-base text-[#071D36] hover:text-[#D4960B] transition-colors break-all"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Website
                      </p>
                      <a
                        href={CONTACT_INFO.websiteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-base text-[#071D36] hover:text-[#D4960B] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{CONTACT_INFO.websiteDisplay}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Location
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {CONTACT_INFO.region}
                      </p>
                      <a
                        href={CONTACT_INFO.mapsShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#071D36] hover:text-[#D4960B] mt-1 transition-colors"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Direct Action Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#16A34A] text-white font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#15803D] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp Us</span>
                  </a>

                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#071D36] text-white font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#0C2A4D] transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#F5B51B]" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Contact Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl border border-slate-200 p-7 sm:p-9">
                <div className="mb-7">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#071D36] mb-2">
                    Send a Service Enquiry
                  </h2>
                  <p className="text-sm text-slate-600">
                    Fill in your plant and equipment details below. Your enquiry is formatted
                    for immediate dispatch via email or WhatsApp to our engineering team.
                  </p>
                </div>

                {submittedPayload ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-[#F4F6F9] border border-slate-200 p-6 sm:p-7 space-y-5"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#071D36]">
                          Enquiry Ready to Send
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Choose your preferred direct channel below to deliver your pre-filled
                          service enquiry immediately to {CONTACT_INFO.contactPerson}.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-4 text-xs sm:text-sm text-slate-700 space-y-1.5">
                      <p>
                        <span className="font-semibold text-[#071D36]">Name:</span>{' '}
                        {submittedPayload.name}
                      </p>
                      {submittedPayload.companyName && (
                        <p>
                          <span className="font-semibold text-[#071D36]">Company:</span>{' '}
                          {submittedPayload.companyName}
                        </p>
                      )}
                      <p>
                        <span className="font-semibold text-[#071D36]">Service:</span>{' '}
                        {submittedPayload.serviceRequired}
                      </p>
                      <p>
                        <span className="font-semibold text-[#071D36]">Contact:</span>{' '}
                        {submittedPayload.phone} · {submittedPayload.email}
                      </p>
                      <p className="pt-2 border-t border-slate-100 whitespace-pre-line">
                        {submittedPayload.message}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={getMailtoHref(submittedPayload)}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#F5B51B] text-[#071D36] font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#E0A20F] transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        <span>Send via Email App</span>
                      </a>

                      <a
                        href={getWhatsAppHref(submittedPayload)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#16A34A] text-white font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#15803D] transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Send via WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSubmittedPayload(null)}
                        className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-[#071D36] transition-colors cursor-pointer"
                      >
                        Edit Details
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#071D36] mb-1.5"
                        >
                          Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => {
                            setForm({ ...form, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          placeholder="Your full name"
                          className={`w-full px-3.5 py-2.5 text-sm rounded-md border bg-white text-[#071D36] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B51B] ${
                            errors.name ? 'border-red-500' : 'border-slate-300'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-company"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#071D36] mb-1.5"
                        >
                          Company Name
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={form.companyName}
                          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                          placeholder="Plant or organization name"
                          className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 bg-white text-[#071D36] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B51B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#071D36] mb-1.5"
                        >
                          Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="name@company.com"
                          className={`w-full px-3.5 py-2.5 text-sm rounded-md border bg-white text-[#071D36] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B51B] ${
                            errors.email ? 'border-red-500' : 'border-slate-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#071D36] mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => {
                            setForm({ ...form, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="+91 98XXXXXXXX"
                          className={`w-full px-3.5 py-2.5 text-sm rounded-md border bg-white text-[#071D36] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B51B] ${
                            errors.phone ? 'border-red-500' : 'border-slate-300'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#071D36] mb-1.5"
                      >
                        Service Required
                      </label>
                      <select
                        id="contact-service"
                        value={form.serviceRequired}
                        onChange={(e) =>
                          setForm({ ...form, serviceRequired: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 bg-white text-[#071D36] focus:outline-none focus:ring-2 focus:ring-[#F5B51B]"
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#071D36] mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Share equipment types (motors, pumps, fans, gearboxes), plant location, and preferred inspection timeframe..."
                        className={`w-full px-3.5 py-2.5 text-sm rounded-md border bg-white text-[#071D36] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5B51B] ${
                          errors.message ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#F5B51B] text-[#071D36] font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#E0A20F] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Send Enquiry</span>
                      </button>

                      <p className="text-xs text-slate-500">
                        Dispatches via your Email app or WhatsApp directly to {CONTACT_INFO.email}.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Embedded Google Maps Location */}
          <div className="mt-10 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display font-bold text-lg text-[#071D36]">
                  Find TM Industrial Solution on Google Maps
                </h2>
                <p className="text-xs text-slate-500">{CONTACT_INFO.region}</p>
              </div>
              <a
                href={CONTACT_INFO.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider bg-[#071D36] text-white rounded-md hover:bg-[#0C2A4D] transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F5B51B]" aria-hidden="true" />
                <span>Open Directions</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
            <div className="w-full h-[360px] sm:h-[420px] bg-slate-100">
              <iframe
                title="TM Industrial Solution Location Map"
                src={CONTACT_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
