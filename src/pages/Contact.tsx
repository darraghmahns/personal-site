// src/pages/Contact.tsx
import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../assets/styles/Contact.css';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Initialize EmailJS with the correct Public Key
  useEffect(() => {
    emailjs.init('NAOIVMA8Iq_XwL4q2'); // Replace with your public key
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs.sendForm('service_szjyjzd', 'template_mh9bjm4', formRef.current)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setStatus('SUCCESS');
          setMessage('Message sent successfully!');
          formRef.current?.reset();
          setTimeout(() => {
            setStatus('');
            setMessage('');
          }, 3000); // Clear status after 3 seconds
        }, (error) => {
          console.log('FAILED...', error);
          setStatus('FAILED');
          setMessage('Failed to send the message. Please try again later.');
          setTimeout(() => {
            setStatus('');
            setMessage('');
          }, 3000); // Clear status after 3 seconds
        });
    }
  };

  return (
    <section className="contact-container">
      <h2>Contact Me</h2>
      <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <p className={`alert ${status === 'SUCCESS' ? 'alert-success' : 'alert-failed'}`}>{message}</p>}
      <div className="contact-info">
        <h3>Get in Touch</h3>
        <p>Email: darraghmahns@gmail.com</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/darraghmahns" target="_blank" rel="noopener noreferrer">darraghmahns</a></p>
      </div>
    </section>
  );
};

export default Contact;