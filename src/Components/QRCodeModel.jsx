import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeModel.css'; 

const QRCodeModel = ({ toggle, qrcode, closeModal }) => {
  if (!toggle) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={closeModal}>×</button>
        <h2>QR Code</h2>
        <QRCodeSVG value={JSON.stringify(qrcode) || 'No data'} size={200} />
        {qrcode && qrcode.label && <p>{qrcode.label}</p>}
      </div>
    </div>
  );
};

export default QRCodeModel;
