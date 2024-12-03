"use client"
import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function TestQR() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");

  React.useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: 250,
        fps: 5,
      },
      /* verbose= */ false
    );

    const onScanSuccess = (decodedText: any, decodedResult: any) => {
      // Stop scanning
      scanner.clear();

      try {
        // Validate and redirect
        const url = new URL(decodedText);
        setScanResult(decodedText);

        // Redirect to the scanned URL
        window.location.href = url.toString();
      } catch (err) {
        setError("Invalid QR code. Please scan a valid URL.");
        console.error("Invalid QR code:", err);
      }
    };

    const onScanError = (errorMessage: any) => {
      // Handle scan errors if needed
      setError(errorMessage);
    };

    scanner.render(onScanSuccess, onScanError);

    // Cleanup
    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">QR Code Scanner</h1>

      <div id="reader" className="w-full max-w-md"></div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {scanResult && (
        <p className="text-green-500 mt-4">Scanned: {scanResult}</p>
      )}
    </div>
  );
}
