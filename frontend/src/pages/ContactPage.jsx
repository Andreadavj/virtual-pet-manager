import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="hero-gradient text-white py-5" style={{ minHeight: '40vh' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="hero-title mb-4">
                Contáctanos 💬
              </h1>
              <p className="hero-subtitle">
                Estamos aquí para ayudarte. Escríbenos y nos pondremos en contacto lo antes posible.
              </p>
            </div>
            <div className="col-lg-4 text-center d-none d-lg-block">
              <div style={{ fontSize: '5rem' }}>📧</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Información de Contacto ── */}
      <section className="py-5" style={{ backgroundColor: '#f7fafc' }}>
        <div className="container">
          <div className="row g-4 mb-5">
            {[
              {
                icon: '📍',
                title: 'Ubicación',
                content: 'Madrid, España',
              },
              {
                icon: '📧',
                title: 'Email',
                content: 'contacto@mascotasvirtuales.com',
              },
              {
                icon: '📱',
                title: 'Teléfono',
                content: '+34 600 123 456',
              },
              {
                icon: '⏰',
                title: 'Horario',
                content: 'Lun - Vie: 9:00 - 18:00',
              },
            ].map((info, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div
                  className="p-4 text-center rounded-lg h-100"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{info.icon}</div>
                  <h4 style={{ color: '#2d3748', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {info.title}
                  </h4>
                  <p style={{ color: '#718096', margin: 0 }}>{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulario de Contacto ── */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-center mb-5" style={{ color: '#2d3748', fontSize: '2rem', fontWeight: 'bold' }}>
                Envíanos un Mensaje 📝
              </h2>

              {submitted && (
                <div
                  className="alert alert-success mb-4 d-flex align-items-center"
                  style={{
                    borderRadius: '0.5rem',
                    animation: 'fadeIn 0.3s ease-in',
                  }}
                  role="alert"
                >
                  <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>✅</span>
                  <div>
                    <h4 className="mb-0">¡Mensaje enviado!</h4>
                    <p className="mb-0">Gracias por contactarnos. Nos pondremos en contacto pronto.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-bold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    style={{
                      borderColor: '#e2e8f0',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    style={{
                      borderColor: '#e2e8f0',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>

                {/* Asunto */}
                <div className="mb-4">
                  <label htmlFor="subject" className="form-label fw-bold">
                    Asunto
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Asunto del mensaje"
                    required
                    style={{
                      borderColor: '#e2e8f0',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>

                {/* Mensaje */}
                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-bold">
                    Mensaje
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tu mensaje..."
                    rows="6"
                    required
                    style={{
                      borderColor: '#e2e8f0',
                      borderRadius: '0.5rem',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Botón Enviar */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold"
                    style={{
                      borderRadius: '0.5rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      padding: '0.75rem',
                    }}
                  >
                    Enviar Mensaje 🚀
                  </button>
                </div>
              </form>

              {/* Enlaces útiles */}
              <div className="mt-5 pt-5" style={{ borderTop: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#2d3748', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                  Preguntas Frecuentes 🤔
                </h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { q: '¿Cómo crear mi primera mascota?', a: 'Dirígete a "Crear Mascota" y completa el formulario.' },
                    { q: '¿Debo pagar por usar la plataforma?', a: 'No, es completamente gratuita.' },
                    { q: '¿Cómo editar mi mascota?', a: 'En la página de detalles de la mascota encontrarás el botón editar.' },
                  ].map((faq, idx) => (
                    <div key={idx} style={{ padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '0.5rem' }}>
                      <p style={{ fontWeight: 'bold', color: '#2d3748', marginBottom: '0.5rem' }}>
                        {faq.q}
                      </p>
                      <p style={{ color: '#718096', margin: 0 }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
