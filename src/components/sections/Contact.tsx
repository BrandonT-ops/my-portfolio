'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      console.log('Form data:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'brandon.tapiba@example.com',
      icon: '📧',
      link: 'mailto:brandon.tapiba@example.com',
    },
    {
      label: 'Location',
      value: 'Cameroon',
      icon: '📍',
    },
    {
      label: 'GitHub',
      value: '@BrandonT-ops',
      icon: '⚙️',
      link: 'https://github.com/BrandonT-ops',
    },
    {
      label: 'LinkedIn',
      value: 'Brandon Tapiba',
      icon: '💼',
      link: 'https://www.linkedin.com/in/brandontapiba',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-onyx mb-4">
            Let&apos;s <span className="text-ruby">Connect</span>
          </h2>
          <div className="w-24 h-2 bg-ruby border-3 border-onyx shadow-brutal-sm mx-auto" />
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="default">
              <h3 className="text-2xl font-bold text-onyx mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-onyx mb-2 uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-3 border-onyx focus:outline-none focus:ring-2 focus:ring-ruby font-medium"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-onyx mb-2 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-3 border-onyx focus:outline-none focus:ring-2 focus:ring-ruby font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-onyx mb-2 uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-3 border-onyx focus:outline-none focus:ring-2 focus:ring-ruby font-medium"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-onyx mb-2 uppercase">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-3 border-onyx focus:outline-none focus:ring-2 focus:ring-ruby resize-none font-medium"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
                </Button>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="p-4 bg-seagreen/10 border-3 border-seagreen text-seagreen font-bold text-center">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-ruby/10 border-3 border-ruby text-ruby font-bold text-center">
                    Oops! Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card variant="ruby">
              <h3 className="text-2xl font-bold text-onyx mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-3xl">{info.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-gray-600 uppercase">{info.label}</div>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-onyx hover:text-ruby transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-lg font-medium text-onyx">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="skyblue">
              <h3 className="text-xl font-bold text-onyx mb-4">Why Work With Me?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-onyx mt-1">✓</span>
                  <span className="text-gray-800">Full-stack expertise with modern technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-onyx mt-1">✓</span>
                  <span className="text-gray-800">User-centered design approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-onyx mt-1">✓</span>
                  <span className="text-gray-800">Clear communication and collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-onyx mt-1">✓</span>
                  <span className="text-gray-800">Commitment to quality and best practices</span>
                </li>
              </ul>
            </Card>

            <Card variant="fawn">
              <h3 className="text-xl font-bold text-onyx mb-4">Available For</h3>
              <div className="flex flex-wrap gap-2">
                {['Freelance Projects', 'Consulting', 'Collaborations', 'Speaking'].map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-2 bg-white border-2 border-onyx text-sm font-bold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
