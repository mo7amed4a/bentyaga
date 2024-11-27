import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>1. Introduction</h2>
        <p style={styles.text}>
          We prioritize protecting the privacy of our customers and are committed to safeguarding your personal information.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>2. Information We Collect</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>Personal Information:</strong> Such as your name, email address, physical address, and phone number.
          </li>
          <li style={styles.listItem}>
            <strong>Financial Information:</strong> Such as payment details if required.
          </li>
          <li style={styles.listItem}>
            <strong>Technical Information:</strong> Such as your IP address, device type, browser, and other data automatically collected when you use our website.
          </li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>3. How We Use the Information</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>To Fulfill Orders:</strong> Using your data to confirm orders, handle shipping, and communicate with you.
          </li>
          <li style={styles.listItem}>
            <strong>To Enhance User Experience:</strong> By analyzing visitor behavior to improve our content and offers.
          </li>
          <li style={styles.listItem}>
            <strong>Marketing & Promotions:</strong> Sending you promotional notifications if you have consented to receive them.
          </li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>4. Sharing Information</h2>
        <p style={styles.text}>
          <strong>With Third Parties:</strong> Such as shipping companies and payment processors. <br />
          <strong>No Selling or Renting:</strong> We do not sell or rent your data to third parties for marketing purposes.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>5. Security</h2>
        <p style={styles.text}>
          We use security measures to protect your personal information, such as encryption and HTTPS protocols.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>6. User Rights</h2>
        <p style={styles.text}>
          You have the right to access, modify, or request deletion of your personal data. You can withdraw your consent or unsubscribe from marketing communications at any time.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>7. Cookies</h2>
        <p style={styles.text}>
          We use cookies to personalize your experience and track behavior on our website. You can manage your cookie preferences in your browser settings.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>8. Changes to the Privacy Policy</h2>
        <p style={styles.text}>
          We may update this Privacy Policy in the future. We will notify you of any significant changes.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>9. Contact Us</h2>
        
        <p style={styles.text}>
        If you have any questions regarding this policy or how we use your personal data, please do not hesitate to contact us via email at <a href="mailto:info@bantayga.wtf" style={styles.link}>info@bantayga.wtf</a> or call us at <a href="tel:+201000598141" style={styles.link}>+201000598141</a>.
        You can also visit our office at 123 Street Nasr city, Cairo, Egypt.
      </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '60rem',
    margin: '60px auto',
    padding: '20px',
    fontFamily: '"Arial", sans-serif',
    color: '#333',
  },
  heading: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.6',
  },
  list: {
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  link: {
    color: '#2980b9',
    textDecoration: 'none',
  }
};

export default PrivacyPolicy;
