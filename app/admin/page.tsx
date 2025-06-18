"use client"

import { useState } from "react"
import { Shield, Users, DollarSign, CheckCircle, XCircle, Clock, Mail, Eye } from "lucide-react"

interface Donation {
  id: string
  donorName: string
  amount: number
  date: string
  status: "completed" | "pending"
  paymentMethod: string
}

interface Recipient {
  id: string
  name: string
  category: string
  amountNeeded: number
  familySize: number
  status: "pending" | "approved" | "rejected"
  submissionDate: string
  phone: string
  reasonForNeed: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"donations" | "recipients" | "notifications">("donations")

  const [donations] = useState<Donation[]>([
    {
      id: "D001",
      donorName: "Ahmad Abdullah",
      amount: 78125, // Changed from 3125 to 78,125 ETB
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "D002",
      donorName: "Fatima Hassan",
      amount: 62500, // Changed from 2500 to 62,500 ETB
      date: "2024-01-14",
      status: "completed",
      paymentMethod: "Online Payment",
    },
    {
      id: "D003",
      donorName: "Omar Ali",
      amount: 46875, // Changed from 1875 to 46,875 ETB
      date: "2024-01-13",
      status: "pending",
      paymentMethod: "Bank Transfer",
    },
  ])

  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: "R001",
      name: "Aisha Mohamed",
      category: "Al-Fuqara (The Poor)",
      amountNeeded: 37500, // Changed from 1500 to 37,500 ETB
      familySize: 4,
      status: "pending",
      submissionDate: "2024-01-12",
      phone: "+251-911-123456", // Changed to Ethiopian phone format
      reasonForNeed: "Lost job due to illness, need assistance for family expenses",
    },
    {
      id: "R002",
      name: "Ibrahim Khan",
      category: "Al-Gharimin (Those in debt)",
      amountNeeded: 50000, // Changed from 2000 to 50,000 ETB
      familySize: 3,
      status: "approved",
      submissionDate: "2024-01-10",
      phone: "+251-911-123457", // Changed to Ethiopian phone format
      reasonForNeed: "Medical debt from emergency surgery",
    },
    {
      id: "R003",
      name: "Maryam Ahmed",
      category: "Ibn as-Sabil (Travelers in need)",
      amountNeeded: 20000, // Changed from 800 to 20,000 ETB
      familySize: 2,
      status: "pending",
      submissionDate: "2024-01-11",
      phone: "+251-911-123458", // Changed to Ethiopian phone format
      reasonForNeed: "Stranded while traveling, need funds to return home",
    },
  ])

  const [notifications] = useState([
    {
      id: "N001",
      type: "email",
      message: "Donation confirmation sent to Ahmad Abdullah",
      timestamp: "2024-01-15 10:30 AM",
      status: "sent",
    },
    {
      id: "N002",
      type: "email",
      message: "Recipient approval notification sent to Ibrahim Khan",
      timestamp: "2024-01-14 2:15 PM",
      status: "sent",
    },
    {
      id: "N003",
      type: "email",
      message: "New recipient application notification",
      timestamp: "2024-01-12 9:45 AM",
      status: "pending",
    },
  ])

  const handleRecipientAction = (recipientId: string, action: "approve" | "reject") => {
    setRecipients((prev) =>
      prev.map((recipient) =>
        recipient.id === recipientId
          ? { ...recipient, status: action === "approve" ? "approved" : "rejected" }
          : recipient,
      ),
    )
  }

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const pendingRecipients = recipients.filter((r) => r.status === "pending").length
  const approvedRecipients = recipients.filter((r) => r.status === "approved").length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Shield className="w-8 h-8 text-zekat-green mr-3" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Manage donations, recipients, and system notifications.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-zekat-green">ETB {totalDonations.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-zekat-green" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Donors</p>
              <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
            </div>
            <Users className="w-8 h-8 text-zekat-gold" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-orange-600">{pendingRecipients}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved Recipients</p>
              <p className="text-2xl font-bold text-green-600">{approvedRecipients}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("donations")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "donations"
                  ? "border-zekat-green text-zekat-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Donations
            </button>
            <button
              onClick={() => setActiveTab("recipients")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "recipients"
                  ? "border-zekat-green text-zekat-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Recipients
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "notifications"
                  ? "border-zekat-green text-zekat-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>
      </div>

      {/* Donations Tab */}
      {activeTab === "donations" && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Donations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{donation.donorName}</div>
                      <div className="text-sm text-gray-500">ID: {donation.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-zekat-green">
                        ETB {donation.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.paymentMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          donation.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recipients Tab */}
      {activeTab === "recipients" && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recipient Applications</h2>
          <div className="space-y-4">
            {recipients.map((recipient) => (
              <div key={recipient.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{recipient.name}</h3>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          recipient.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : recipient.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {recipient.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Category</p>
                        <p className="text-sm text-gray-900">{recipient.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Amount Needed</p>
                        <p className="text-sm font-semibold text-zekat-green">
                          ETB {recipient.amountNeeded.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Family Size</p>
                        <p className="text-sm text-gray-900">{recipient.familySize} members</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Submitted</p>
                        <p className="text-sm text-gray-900">{recipient.submissionDate}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">Reason for Need</p>
                      <p className="text-sm text-gray-900">{recipient.reasonForNeed}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600">Contact: {recipient.phone}</p>
                    </div>
                  </div>
                </div>

                {recipient.status === "pending" && (
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => handleRecipientAction(recipient.id, "approve")}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleRecipientAction(recipient.id, "reject")}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Email Notification Center</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-zekat-gold" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.timestamp}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      notification.status === "sent" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {notification.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Manual Notification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
                <input type="email" placeholder="recipient@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input type="text" placeholder="Email subject" className="input-field" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows={4} placeholder="Email message content" className="input-field" />
            </div>
            <button className="btn-primary mt-4">Send Email</button>
          </div>
        </div>
      )}
    </div>
  )
}
