"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { FrontendInvoice } from '@/types';
import { Loader2, CheckCircle2, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const DonatePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [invoice, setInvoice] = useState<FrontendInvoice | null>(null);
  const [checkingPayment, setCheckingPayment] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const predefinedAmounts = [1000, 5000, 10000]; // in sats

  const handleAmountSelect = (amount: number | 'custom') => {
    if (amount === 'custom') {
      setShowCustomAmount(true);
      setSelectedAmount(null);
    } else {
      setShowCustomAmount(false);
      setSelectedAmount(amount);
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const amount = selectedAmount || parseInt(customAmount);
      
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          memo,
          expiry: 3600, // 1 hour
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate invoice");
      }

      const data = await response.json();
      console.log("Invoice generated:", { data });
      setInvoice(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Poll for invoice payment status
  useEffect(() => {
    if (!invoice || invoice.isPaid) return;

    setCheckingPayment(true);
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/invoice/${invoice.rHash}/status`);
        if (!response.ok) {
          throw new Error("Failed to check payment status");
        }

        const data = await response.json();
        if (data.isPaid) {
          setInvoice((prev: FrontendInvoice | null) => (prev ? { ...prev, isPaid: true } : null));
          toast.success("Payment received!", {
            description: "The invoice has been paid successfully.",
          });
          clearInterval(pollInterval);
          setCheckingPayment(false);
        }
      } catch (err) {
        console.error("Error checking payment status:", err);
      }
    }, 2000); // Poll every 2 seconds

    return () => {
      clearInterval(pollInterval);
      setCheckingPayment(false);
    };
  }, [invoice]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4 glow-cyan">Support Your Local Hospital</h1>
        
        <p className="text-lg text-cyan-300 mb-8">
          Your donation helps us provide better healthcare services to those in need. Every contribution makes a difference.
        </p>

        <div className="bg-zinc-800/80 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] p-8 mb-8 border border-cyan-500/30">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Make a Donation</h2>
          <p className="text-cyan-300 mb-6">
            Choose an amount to donate to City General Hospital (in sats)
          </p>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                className={cn(
                  "py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105",
                  selectedAmount === amount
                    ? "bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.5)] scale-105 border border-fuchsia-400"
                    : "bg-zinc-700 hover:bg-zinc-600 text-cyan-300 border border-cyan-500/30"
                )}
                onClick={() => handleAmountSelect(amount)}
              >
                {amount.toLocaleString()} sats
              </button>
            ))}
            <button
              className={cn(
                "py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105",
                showCustomAmount
                  ? "bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.5)] scale-105 border border-fuchsia-400"
                  : "bg-zinc-700 hover:bg-zinc-600 text-cyan-300 border border-cyan-500/30"
              )}
              onClick={() => handleAmountSelect('custom')}
            >
              Specify Amount
            </button>
          </div>

          {showCustomAmount && (
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg font-medium transition-all border bg-zinc-700",
                    customAmount ? "border-fuchsia-500 shadow-[0_0_15px_rgba(192,38,211,0.3)]" : "border-cyan-500/30",
                    "focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-cyan-300 placeholder-cyan-600"
                  )}
                />
                <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  sats
                </span>
              </div>
            </div>
          )}

          <button 
            className={cn(
              "w-full py-4 px-8 rounded-lg font-semibold text-lg",
              "bg-cyan-500 hover:bg-cyan-600",
              "text-white transition-all transform hover:scale-102 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]",
              (!selectedAmount && !customAmount) && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedAmount && !customAmount}
          >
            Donate Now
          </button>
        </div>

        <p className="text-sm text-cyan-400">
          All donations are tax deductible.
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-zinc-900/80 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-zinc-800/90 backdrop-blur-sm rounded-xl p-8 max-w-md w-full shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-cyan-500/30 transform transition-all animate-slideUp">
            <h3 className="text-2xl font-semibold mb-6 text-center text-cyan-400">Complete Your Donation</h3>
            
            {!invoice ? (
              <>
                <div className="bg-gradient-to-r from-cyan-900/50 to-fuchsia-900/50 rounded-lg p-4 mb-6 text-center border border-cyan-500/30">
                  <p className="text-cyan-300 mb-2">Amount to donate:</p>
                  <p className="text-4xl font-bold text-fuchsia-400 glow-fuchsia">
                    {(selectedAmount || parseInt(customAmount) || 0).toLocaleString()} sats
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <textarea
                    placeholder="Leave a message (optional)"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="w-full p-3 rounded-lg border border-cyan-500/30 bg-zinc-700/50 text-cyan-300 placeholder-cyan-600 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 min-h-[100px]"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    className="flex-1 py-3 px-4 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-cyan-300 transition-all transform hover:scale-105 border border-cyan-500/30"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                        Generating Invoice...
                      </>
                    ) : (
                      "Generate Invoice"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {invoice.isPaid ? (
                  <div className="flex flex-col items-center justify-center py-8 text-green-400">
                    <CheckCircle2 className="h-24 w-24 animate-in zoom-in" />
                    <p className="mt-4 text-lg font-medium">Payment Received!</p>
                    <p className="text-sm text-cyan-300">
                      Amount: {invoice.amount.toLocaleString()} sats
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-lg">
                        <QRCodeSVG value={invoice.paymentRequest} size={200} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300">Invoice</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(invoice.paymentRequest);
                            toast.success("Copied to clipboard", {
                              description: "Invoice has been copied to clipboard",
                            });
                          }}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </button>
                      </div>
                      <div className="p-3 bg-zinc-700/50 rounded-md">
                        <p className="text-xs break-all font-mono text-cyan-300">
                          {invoice.paymentRequest}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-cyan-300">
                      <div>
                        <span className="font-medium">Amount:</span>{" "}
                        {invoice.amount.toLocaleString()} sats
                      </div>
                      <div>
                        <span className="font-medium">Expires in:</span>{" "}
                        {Math.floor(invoice.expiry / 60)} minutes
                      </div>
                    </div>

                    {checkingPayment && (
                      <div className="flex items-center justify-center py-4 text-cyan-300">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>Waiting for payment...</span>
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    className="flex-1 py-3 px-4 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-cyan-300 transition-all transform hover:scale-105 border border-cyan-500/30"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .glow-cyan {
          text-shadow: 0 0 10px rgba(6,182,212,0.5);
        }
        .glow-fuchsia {
          text-shadow: 0 0 10px rgba(192,38,211,0.5);
        }
      `}</style>
    </div>
  );
};

export default DonatePage;
