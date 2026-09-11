import React from 'react';

const Contact = () => {
  const [status, setStatus] = React.useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    const formData = new FormData(e.target);
    // Veb-saytdan olingan Web3Forms kalitini shu yerga yozasiz
    formData.append("access_key", "1ba94534-99fd-4dc7-b7b2-32b3386dc907");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Success');
        e.target.reset();
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Error');
      }
    } catch (error) {
      setStatus('Error');
    }
  };

  return (
    <section id="contact" className="section-padding pt-0">
      <div className="contact-wrapper card-glass rounded-4 p-4 p-lg-5">
        <div className="contact-bg-glow"></div>
        
        <div className="row g-5 position-relative z-2">
          <div className="col-lg-5">
            <div className="pe-lg-4">
              <h2 className="display-5 fw-bold mb-3">
                LET'S WORK<br />
                <span className="text-gradient">TOGETHER!</span>
              </h2>
              <p className="text-secondary-color mb-5 fs-5">
                Have a project in mind? Let's create something great together.
              </p>
              
              <div className="contact-info-list mb-5">
                <div className="contact-info-item">
                  <div className="icon-box"><i className="bi bi-envelope"></i></div>
                  <div>
                    <div className="text-secondary-color small">Email Us</div>
                    <div className="fw-semibold">otabek11.haydarov@gmail.com</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="icon-box"><i className="bi bi-telephone"></i></div>
                  <div>
                    <div className="text-secondary-color small">Call Us</div>
                    <div className="fw-semibold">+998902771104</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="icon-box"><i className="bi bi-geo-alt"></i></div>
                  <div>
                    <div className="text-secondary-color small">Location</div>
                    <div className="fw-semibold">Tashkent, Uzbekistan</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="p-4 p-lg-5 bg-glass rounded-4 h-100 d-flex flex-column justify-content-center">
              <h3 className="mb-4">Send Message</h3>
              
              {status === 'Success' && (
                <div className="alert alert-success bg-success bg-opacity-10 text-success border-success border-opacity-25" role="alert">
                  Xabaringiz muvaffaqiyatli yuborildi! Tez orada aloqaga chiqamiz.
                </div>
              )}
              {status === 'Error' && (
                <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-danger border-opacity-25" role="alert">
                  Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="Full Name" required disabled={status === 'Sending...'} />
                </div>
                <div className="col-md-6">
                  <input type="email" name="email" className="form-control" placeholder="Email Address" required disabled={status === 'Sending...'} />
                </div>
                <div className="col-12">
                  <input type="text" name="subject" className="form-control" placeholder="Subject" required disabled={status === 'Sending...'} />
                </div>
                <div className="col-12">
                  <textarea name="message" className="form-control" rows="5" placeholder="Your Message" required disabled={status === 'Sending...'}></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-gradient w-100 py-3 d-flex justify-content-center align-items-center gap-2" disabled={status === 'Sending...'}>
                    {status === 'Sending...' ? 'Yuborilmoqda...' : 'Send Message'} <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
