"use client"

import { useState } from "react"
import { Calendar, DollarSign, AlertTriangle, History, CreditCard } from "lucide-react"
import Link from "next/link"

export default function DonorDashboard() {
  const [donorName] = useState("Ahmad Abdullah")
  const [zekatData] = useState({
    totalAssets: 3125000, // Changed from 125000 to 3,125,000 ETB
    nisabThreshold: 2125000, // Changed from 85000 to 2,125,000 ETB
    zekatDue: 78125, // Changed from 3125 to 78,125 ETB
    lastPaymentDate: "2024-01-15",
    nextDueDate: "2025-01-15",
    daysUntilDue: 45,
  })

  const isZekatDueSoon = zekatData.daysUntilDue <= 60

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assalamu Alaikum, {donorName}</h1>
        <p className="text-gray-600">Welcome to your Zekat dashboard. May Allah accept your charity.</p>
      </div>

      {/* Notification Alert */}
      {isZekatDueSoon && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-zekat-gold p-4 rounded-r-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-zekat-gold mr-3" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Zekat Due Soon</p>
              <p className="text-sm text-yellow-700">
                Your Zekat payment is due in {zekatData.daysUntilDue} days ({zekatData.nextDueDate})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Zekat Summary Card */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Zekat Summary</h2>
          <div className="bg-zekat-green text-white px-3 py-1 rounded-full text-sm font-medium">Active</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">ETB {zekatData.totalAssets.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-zekat-green" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nisab Threshold</p>
                <p className="text-2xl font-bold text-gray-900">ETB {zekatData.nisabThreshold.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-zekat-gold rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">N</span>
              </div>
            </div>
          </div>

          <div className="bg-zekat-green p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white opacity-90">Zekat Due</p>
                <p className="text-2xl font-bold text-white">ETB {zekatData.zekatDue.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Until Due</p>
                <p className="text-2xl font-bold text-gray-900">{zekatData.daysUntilDue}</p>
              </div>
              <Calendar className="w-8 h-8 text-zekat-gold" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Last Payment Date</p>
            <p className="text-lg font-semibold text-gray-900">{zekatData.lastPaymentDate}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Next Due Date</p>
            <p className="text-lg font-semibold text-gray-900">{zekatData.nextDueDate}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/calculator" className="btn-primary text-center">
            Pay Zekat Now
          </Link>
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <History className="w-4 h-4" />
            <span>View Calculation History</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">This Year</h3>
          <p className="text-3xl font-bold text-zekat-green">ETB 78,125</p>
          <p className="text-sm text-gray-600">Total Zekat Paid</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recipients Helped</h3>
          <p className="text-3xl font-bold text-zekat-gold">24</p>
          <p className="text-sm text-gray-600">Families Supported</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Calculation</h3>
          <p className="text-3xl font-bold text-gray-900">{zekatData.daysUntilDue}</p>
          <p className="text-sm text-gray-600">Days Remaining</p>
        </div>
      </div>
    </div>
  )
}
