"use client"

import type React from "react"

import { useState } from "react"
import { Users, FileText, Phone, Mail, DollarSign, Home } from "lucide-react"

const zekatCategories = [
  "Al-Fuqara (The Poor)",
  "Al-Masakin (The Needy)",
  "Al-Amilina Alayha (Zekat Collectors)",
  "Al-Muallafatu Qulubuhum (Those whose hearts are to be reconciled)",
  "Ar-Riqab (Freeing slaves/captives)",
  "Al-Gharimin (Those in debt)",
  "Fi Sabilillah (In the path of Allah)",
  "Ibn as-Sabil (Travelers in need)",
]

export default function RecipientRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    familySize: "",
    amountNeeded: "",
    phone: "",
    email: "",
    address: "",
    zekatCategory: "",
    reasonForNeed: "",
    monthlyIncome: "",
    hasOtherSupport: false,
    supportDetails: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-zekat-green rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
            <p className="text-gray-600">Your recipient registration has been submitted for review.</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">What happens next?</h2>
            <div className="text-left space-y-2 text-sm text-blue-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Your application will be reviewed by our admin team</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>We may contact you for additional information</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>You will be notified of the decision via email/phone</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Processing time: 3-5 business days</span>
              </div>
            </div>
          </div>

          <div className="bg-zekat-gold bg-opacity-20 border border-zekat-gold rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-800">
              Reference Number: <span className="font-bold">ZR-{Date.now().toString().slice(-6)}</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">Please keep this reference number for your records</p>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                fullName: "",
                idNumber: "",
                familySize: "",
                amountNeeded: "",
                phone: "",
                email: "",
                address: "",
                zekatCategory: "",
                reasonForNeed: "",
                monthlyIncome: "",
                hasOtherSupport: false,
                supportDetails: "",
              })
            }}
            className="btn-secondary w-full"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Users className="w-8 h-8 text-zekat-green mr-3" />
          Recipient Registration
        </h1>
        <p className="text-gray-600">Apply to receive Zekat assistance. All information will be kept confidential.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Number / Document *</label>
              <input
                type="text"
                required
                value={formData.idNumber}
                onChange={(e) => handleInputChange("idNumber", e.target.value)}
                placeholder="National ID, Passport, etc."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <div className="relative">
              <Home className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                required
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your complete address"
                rows={3}
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        {/* Family & Financial Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Family & Financial Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Family Size *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.familySize}
                onChange={(e) => handleInputChange("familySize", e.target.value)}
                placeholder="Number of family members"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (ETB)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  placeholder="0 ETB"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Needed (ETB) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.amountNeeded}
                  onChange={(e) => handleInputChange("amountNeeded", e.target.value)}
                  placeholder="0 ETB"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zekat Category *</label>
              <select
                required
                value={formData.zekatCategory}
                onChange={(e) => handleInputChange("zekatCategory", e.target.value)}
                className="input-field"
              >
                <option value="">Select category</option>
                {zekatCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Need *</label>
            <textarea
              required
              value={formData.reasonForNeed}
              onChange={(e) => handleInputChange("reasonForNeed", e.target.value)}
              placeholder="Please explain your situation and why you need assistance"
              rows={4}
              className="input-field"
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasOtherSupport"
                checked={formData.hasOtherSupport}
                onChange={(e) => handleInputChange("hasOtherSupport", e.target.checked)}
                className="w-4 h-4 text-zekat-green bg-gray-100 border-gray-300 rounded focus:ring-zekat-green focus:ring-2"
              />
              <label htmlFor="hasOtherSupport" className="ml-2 text-sm font-medium text-gray-700">
                I receive support from other sources
              </label>
            </div>

            {formData.hasOtherSupport && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Details</label>
                <textarea
                  value={formData.supportDetails}
                  onChange={(e) => handleInputChange("supportDetails", e.target.value)}
                  placeholder="Please describe other sources of support"
                  rows={3}
                  className="input-field"
                />
              </div>
            )}
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="card">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Declaration</h3>
            <p className="text-sm text-gray-600 mb-2">By submitting this application, I declare that:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All information provided is true and accurate</li>
              <li>• I understand that false information may result in disqualification</li>
              <li>• I consent to verification of the information provided</li>
              <li>• I will notify of any changes in my circumstances</li>
            </ul>
          </div>

          <button type="submit" className="btn-primary w-full text-lg py-3">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  )
}
