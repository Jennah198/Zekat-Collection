"use client"

import { useState } from "react"
import { Calculator, Info, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ZekatCalculator() {
  const [formData, setFormData] = useState({
    savings: "",
    gold: "",
    silver: "",
    investments: "",
    businessAssets: "",
    otherAssets: "",
  })

  const [calculationResult, setCalculationResult] = useState({
    totalAssets: 0,
    zekatAmount: 0,
    isEligible: false,
    nisabThreshold: 2125000, // Changed from 85000 to 2,125,000 ETB
  })

  const handleInputChange = (field: string, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "")
    setFormData((prev) => ({
      ...prev,
      [field]: numericValue,
    }))
    calculateZekat({ ...formData, [field]: numericValue })
  }

  const calculateZekat = (data: typeof formData) => {
    const total = Object.values(data).reduce((sum, value) => {
      return sum + (Number.parseFloat(value) || 0)
    }, 0)

    const zekatRate = 0.025 // 2.5%
    const zekatAmount = total * zekatRate
    const isEligible = total >= calculationResult.nisabThreshold

    setCalculationResult({
      totalAssets: total,
      zekatAmount: zekatAmount,
      isEligible: isEligible,
      nisabThreshold: 2125000,
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Calculator className="w-8 h-8 text-zekat-green mr-3" />
          Zekat Calculator
        </h1>
        <p className="text-gray-600">Calculate your Zekat obligation based on your assets and savings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Assets</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cash Savings (ETB)</label>
                <input
                  type="text"
                  value={formData.savings}
                  onChange={(e) => handleInputChange("savings", e.target.value)}
                  placeholder="Enter your cash savings in ETB"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gold Value (ETB)</label>
                <input
                  type="text"
                  value={formData.gold}
                  onChange={(e) => handleInputChange("gold", e.target.value)}
                  placeholder="Current market value of gold in ETB"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Silver Value (ETB)</label>
                <input
                  type="text"
                  value={formData.silver}
                  onChange={(e) => handleInputChange("silver", e.target.value)}
                  placeholder="Current market value of silver in ETB"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investments (ETB)</label>
                <input
                  type="text"
                  value={formData.investments}
                  onChange={(e) => handleInputChange("investments", e.target.value)}
                  placeholder="Stocks, bonds, mutual funds in ETB"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Assets (ETB)</label>
                <input
                  type="text"
                  value={formData.businessAssets}
                  onChange={(e) => handleInputChange("businessAssets", e.target.value)}
                  placeholder="Business inventory and assets in ETB"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Assets (ETB)</label>
                <input
                  type="text"
                  value={formData.otherAssets}
                  onChange={(e) => handleInputChange("otherAssets", e.target.value)}
                  placeholder="Other zakatable assets in ETB"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Results */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Calculation Results</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">ETB {calculationResult.totalAssets.toLocaleString()}</p>
              </div>

              <div className="bg-zekat-green p-4 rounded-lg">
                <p className="text-sm font-medium text-white opacity-90">Zekat Due (2.5%)</p>
                <p className="text-2xl font-bold text-white">ETB {calculationResult.zekatAmount.toLocaleString()}</p>
              </div>

              <div className="bg-zekat-gold p-4 rounded-lg">
                <p className="text-sm font-medium text-black">Nisab Threshold</p>
                <p className="text-xl font-bold text-black">ETB {calculationResult.nisabThreshold.toLocaleString()}</p>
              </div>

              <div
                className={`p-4 rounded-lg ${calculationResult.isEligible ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <div className="flex items-center">
                  <Info
                    className={`w-5 h-5 mr-2 ${calculationResult.isEligible ? "text-green-600" : "text-red-600"}`}
                  />
                  <div>
                    <p
                      className={`text-sm font-medium ${calculationResult.isEligible ? "text-green-800" : "text-red-800"}`}
                    >
                      {calculationResult.isEligible ? "Zekat Required" : "Below Nisab"}
                    </p>
                    <p className={`text-xs ${calculationResult.isEligible ? "text-green-600" : "text-red-600"}`}>
                      {calculationResult.isEligible
                        ? "You are obligated to pay Zekat"
                        : "Your assets are below the Nisab threshold"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {calculationResult.isEligible && calculationResult.zekatAmount > 0 && (
              <div className="mt-6 space-y-3">
                <Link
                  href="/payment"
                  className="btn-primary w-full text-center flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="btn-secondary w-full">Save Calculation</button>
              </div>
            )}
          </div>

          {/* Nisab Information */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About Nisab</h3>
            <p className="text-sm text-gray-600 mb-2">
              Nisab is the minimum amount of wealth a Muslim must have before being obligated to pay Zekat.
            </p>
            <p className="text-sm text-gray-600">
              Current Nisab threshold:{" "}
              <span className="font-semibold">ETB {calculationResult.nisabThreshold.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
