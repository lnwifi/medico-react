import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>Sistema de Emergencias Médicas Pediátricas - Argentina 🇦🇷</p>
        <p><small>Basado en protocolos ANMAT y guías pediátricas argentinas</small></p>
        <p style={{ marginTop: '10px', fontSize: '13px', opacity: 0.8 }}>
          App creada con mucho ❤️ por Lucas Navarro
        </p>
      </div>
    </footer>
  );
};

export default Footer;