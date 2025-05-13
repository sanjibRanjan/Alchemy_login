import React, { useState } from 'react';
import { Button } from './ui/button';
import { Edit, Trash2, ExternalLink, QrCode } from 'lucide-react';
import QRCodeModal from './QRCodeModel';

const NFTList = ({ nfts, onEdit, onDelete, onView }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [toogle, setToogle] = useState(false);

  const openmodel = (nft) => {
    setSelectedNFT(nft);
    setToogle(true);
  };

  const closeModal = () => {
    setSelectedNFT(null);
    setToogle(false);
  };

  if (nfts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No NFTs found. Create your first NFT to see it here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <div 
            key={nft.id} 
            className="bg-black/20 rounded-lg border border-white/10 p-4 hover:border-purple-500/30 transition-colors"
          >
            {nft.imageData && (
              <div className="mb-3 rounded-md overflow-hidden h-40 flex items-center justify-center bg-black/30">
                <img 
                  src={nft.imageData} 
                  alt={nft.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-white mb-1 truncate">{nft.name}</h3>
            <p className="text-sm text-gray-400 mb-2 truncate">{nft.productDetails}</p>
            
            <div className="text-xs text-gray-500 mb-3">
              <p>Certificate ID: <span className="font-mono text-purple-300">{nft.certificateId}</span></p>
              <p>Created: {new Date(nft.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div className="flex justify-between mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(nft)}
                className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(nft)}
                className="text-green-400 border-green-400/30 hover:bg-green-400/10"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => openmodel(nft)}
                className="text-purple-400 border-purple-400/30 hover:bg-purple-400/10"
              >
                <QrCode className="h-3 w-3 mr-1" />
                QR
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(nft.id)}
                className="text-red-400 border-red-400/30 hover:bg-red-400/10"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <QRCodeModal toggle={toogle} qrcode={selectedNFT} closeModal={closeModal} />
    </>
  );
};

export default NFTList;
