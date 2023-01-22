import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope } from 'react-icons/fa';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import Card from '../../components/Card/Card';
import styles from './Contact.module.scss';
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.REACT_APP_EMAIL_SID, process.env.REACT_APP_EMAIL_TID, form.current, process.env.REACT_APP_EMAIL_PK)
      .then(
        (result) => {
          toast.success('Message sent!', { theme: 'colored' });
        },
        (error) => {
          toast.error(error.text, { theme: 'colored' });
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2 className='--my'>Contact Us!</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input type='text' name='user_name' placeholder='John Doe' required />
              <label>Email:</label>
              <input type='text' name='user_email' placeholder='example@example.com' required />
              <label>Subject:</label>
              <input type='text' name='subject' placeholder='Tell us the subject' required />
              <label>Message:</label>
              <textarea name='message' cols='30' rows='10' placeholder='Tell us what is happening...'></textarea>
              <button className='--btn --btn-primary'>Send Message!</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our contact info</h3>
              <p className='--my'>Fill the form or contact us through through the channels bellow.</p>
              <div className={styles.icons}>
                <span>
                  <FaEnvelope size={20} />
                  <p>gabrielspadadesouza@gmail.com</p>
                </span>
                <span>
                  <BsGithub size={20} />
                  <a href='https://github.com/gbrlspd/gs-shop' target='_blank' rel='noreferrer'>
                    <p>https://github.com/gbrlspd</p>
                  </a>
                </span>
                <span>
                  <BsLinkedin size={20} />
                  <a href='https://www.linkedin.com/in/gbrlspd' target='_blank' rel='noreferrer'>
                    <p>linkedin.com/in/gbrlspd</p>
                  </a>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
