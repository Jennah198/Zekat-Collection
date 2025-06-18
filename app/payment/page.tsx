"use client"

import { useState } from "react"
import { CheckCircle, CreditCard, Mail, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PaymentConfirmation() {
  const [paymentData] = useState({
    donorName: "Ahmad Abdullah",
    zekatAmount: 78125, // Changed from 3125 to 78,125 ETB
    totalAssets: 3125000, // Changed from 125000 to 3,125,000 ETB
    calculationDate: new Date().toLocaleDateString(),
    paymentMethod: "Bank Transfer",
  })

  const [isConfirmed, setIsConfirmed] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleConfirmPayment = () => {
    setIsConfirmed(true)
    // Simulate email sending
    setTimeout(() => {
      setEmailSent(true)
    }, 2000)
  }

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-zekat-green mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Confirmed!</h1>
            <p className="text-gray-600">Your Zekat payment has been processed successfully.</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">What happens next?</h2>
            <div className="text-left space-y-2 text-sm text-green-700">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>Confirmation email sent to Mejlis administration</span>
                {emailSent && <CheckCircle className="w-4 h-4 ml-2 text-green-600" />}
              </div>
              <div className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                <span>You will be redirected to the official collection portal</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="https://mejlis-official-portal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <span>Continue to Mejlis Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link href="/" className="btn-secondary w-full">
              Return to Dashboard
            </Link>
          </div>

          {emailSent && (
            <div className="mt-6 bg-zekat-gold bg-opacity-20 border border-zekat-gold rounded-lg p-4">
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 text-zekat-gold mr-2" />
                <span className="text-sm font-medium text-gray-800">
                  Email notification sent to Mejlis successfully!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/calculator" className="flex items-center text-zekat-green hover:text-zekat-green-dark mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculator
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Confirmation</h1>
        <p className="text-gray-600">Review your Zekat calculation and confirm payment.</p>
      </div>

      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <CreditCard className="w-6 h-6 text-zekat-green mr-2" />
          Payment Summary
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Donor Name</p>
              <p className="text-lg font-semibold text-gray-900">{paymentData.donorName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Calculation Date</p>
              <p className="text-lg font-semibold text-gray-900">{paymentData.calculationDate}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-lg font-semibold text-gray-900">ETB {paymentData.totalAssets.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Zekat Rate</p>
                <p className="text-lg font-semibold text-gray-900">2.5%</p>
              </div>
            </div>

            <div className="bg-zekat-green p-4 rounded-lg">
              <p className="text-sm font-medium text-white opacity-90">Total Zekat Due</p>
              <p className="text-3xl font-bold text-white">ETB {paymentData.zekatAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-zekat-gold rounded-lg flex items-center justify-center mr-4">
              <CreditCard className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Mejlis Official Portal</p>
              <p className="text-sm text-gray-600">Secure bank transfer through official channels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-zekat-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Your payment will be processed through the official Mejlis collection portal</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-zekat-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>A confirmation email will be sent to the Mejlis administration</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-zekat-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>You will receive a receipt for your records</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button onClick={handleConfirmPayment} className="btn-primary w-full text-lg py-3">
          Confirm & Proceed to Payment
        </button>

        <Link href="/calculator" className="btn-secondary w-full text-center">
          Modify Calculation
        </Link>
      </div>
    </div>
  )
}
