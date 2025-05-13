import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea'; 
import { Loader2, Wallet, Upload } from 'lucide-react';
import { cn } from '../lib/utils';
import NFTList from './NFTList';




const NftMintingPlatform = () => {
  const [wallet, setWallet] = useState('');
  const [nftData, setNftData] = useState({
    name: '',
    placeOfIssue: '',
    ownership: '',
    productDetails: '',
    imageData: '',
  });
  const [storedNFTs, setStoredNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingNFT, setEditingNFT] = useState(null);

  useEffect(() => {
    loadStoredNFTs();
  }, []);

  const loadStoredNFTs = () => {
    try {
      // For now, initialize with an empty array since nftStorage is commented out
      // When you implement nftStorage, uncomment the line below
      // const nfts = nftStorage.getAll();
      setStoredNFTs([]);
    } catch (err) {
      setError('Failed to load stored NFTs');
    }
  };

  const handleConnectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Mock wallet connection
      const mockWallet = '0x' + Math.random().toString(16).substr(2, 40);
      setWallet(mockWallet);
      setSuccess('Wallet connected successfully!');
    } catch (err) {
      setError('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNftData(prev => ({ ...prev, imageData: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMintNFT = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock NFT minting
      const certificateId = 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      const newNFT = {
        ...nftData,
        id: Math.random().toString(36).substr(2, 9),
        certificateId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      //nftStorage.save(newNFT);
      setStoredNFTs(prev => [...prev, newNFT]);
      setSuccess(`NFT minted successfully! Certificate ID: ${certificateId}`);
      resetForm();
    } catch (err) {
      setError('Failed to mint NFT');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNFT = (nft) => {
    setEditingNFT(nft);
    setNftData({
      name: nft.name,
      placeOfIssue: nft.placeOfIssue,
      ownership: nft.ownership,
      productDetails: nft.productDetails,
      imageData: nft.imageData,
    });
  };

  const handleUpdateNFT = async () => {
    if (!editingNFT) return;

    try {
      setIsLoading(true);
      setError(null);

      const updatedNFT = {
        ...editingNFT,
        ...nftData,
        updatedAt: new Date().toISOString(),
      };

      // When you implement nftStorage, uncomment the line below
      // nftStorage.update(updatedNFT.id, updatedNFT);
      
      setStoredNFTs(prev => prev.map(nft => nft.id === updatedNFT.id ? updatedNFT : nft));
      setSuccess('NFT updated successfully!');
      resetForm();
    } catch (err) {
      setError('Failed to update NFT');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNFT = async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      //nftStorage.delete(id);
      setStoredNFTs(prev => prev.filter(nft => nft.id !== id));
      setSuccess('NFT deleted successfully!');
    } catch (err) {
      setError('Failed to delete NFT');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewNFT = (nft) => {
    // Implement view functionality (e.g., show details in a modal)
    console.log('Viewing NFT:', nft);
  };

  const resetForm = () => {
    setNftData({
      name: '',
      placeOfIssue: '',
      ownership: '',
      productDetails: '',
      imageData: '',
    });
    setEditingNFT(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">NFT Minting Platform</h1>
        {!wallet ? (
          <div className="text-center">
            <Button
              onClick={handleConnectWallet}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Wallet className="h-4 w-4 mr-2" />
              )}
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-black/20 rounded-lg border border-white/10 p-6 mb-8">
              <div className="mb-4">
                <p className="text-sm text-gray-400">Connected Wallet</p>
                <p className="font-mono text-purple-300">{wallet}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    name="name"
                    value={nftData.name}
                    onChange={handleInputChange}
                    placeholder="Enter NFT name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Place of Issue</label>
                  <Input
                    name="placeOfIssue"
                    value={nftData.placeOfIssue}
                    onChange={handleInputChange}
                    placeholder="Enter place of issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ownership</label>
                  <Input
                    name="ownership"
                    value={nftData.ownership}
                    onChange={handleInputChange}
                    placeholder="Enter ownership details"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Product Details</label>
                  <Textarea
                    name="productDetails"
                    value={nftData.productDetails}
                    onChange={handleInputChange}
                    placeholder="Enter product details"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={cn(
                        "cursor-pointer inline-flex items-center px-4 py-2 border border-white/10 rounded-md",
                        "hover:bg-white/5 transition-colors"
                      )}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </label>
                    {nftData.imageData && (
                      <div className="h-10 w-10 rounded overflow-hidden">
                        <img
                          src={nftData.imageData}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  {editingNFT && (
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={editingNFT ? handleUpdateNFT : handleMintNFT}
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      editingNFT ? "Update NFT" : "Mint NFT"
                    )}
                  </Button>
                </div>
              </div>
            </div>
            {/* Render NFTList component */}
            {storedNFTs.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Your NFTs</h2>
                <NFTList 
                  nfts={storedNFTs} 
                  onEdit={handleEditNFT} 
                  onDelete={handleDeleteNFT} 
                  onView={handleViewNFT} 
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NftMintingPlatform;
