"use client";

import { useState, useEffect } from "react";
import { Users, Clock, CheckCircle, Search, ChevronDown, RefreshCw } from "lucide-react";

type Booking = {
  id: number;
  full_name: string;
  phone: string;
  destination: string;
  hotel_name: string;
  price: number;
  flight_class: string;
  flight_type: string;
  status: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Fetch live PostgreSQL bindings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/bookings");
      const json = await res.json();
      if (json.success) {
        setBookings(json.data);
      }
    } catch (error) {
      console.error("Failed to load records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    // Optimistic update
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    
    try {
      await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert if failed (simple reload for this CRM)
      fetchBookings();
    }
  };

  const totalApplications = bookings.length;
  const pendingReview = bookings.filter(b => b.status === "Pending").length;
  const completedBookings = bookings.filter(b => b.status === "Completed").length;

  const filteredBookings = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Contacted": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Completed": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-brand-deep text-white p-6 sm:p-12 font-sans selection:bg-gold selection:text-brand-deep">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-gold mb-2">
            <span className="w-1.5 h-1.5 rounded-pill bg-gold"></span>
            Compliance & Licensing Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Admin CRM Dashboard</h1>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-gold hover:text-gold transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Metrics Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-gold/30 transition-colors">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <Users className="w-6 h-6 text-blue-400 mb-4" />
          <p className="text-sm font-medium text-white/60 mb-1">Total Applications</p>
          <p className="text-4xl font-bold">{totalApplications}</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-gold/30 transition-colors">
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <Clock className="w-6 h-6 text-amber-400 mb-4" />
          <p className="text-sm font-medium text-white/60 mb-1">Pending Review</p>
          <p className="text-4xl font-bold">{pendingReview}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-gold/30 transition-colors">
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <CheckCircle className="w-6 h-6 text-emerald-400 mb-4" />
          <p className="text-sm font-medium text-white/60 mb-1">Completed Bookings</p>
          <p className="text-4xl font-bold">{completedBookings}</p>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-medium">Booking Records</h2>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-shadow"
              />
            </div>
            <select 
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold [&>option]:bg-brand-deep cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-xs uppercase tracking-wider text-white/50 font-semibold border-b border-white/10">
                <th className="p-4 pl-6 font-medium">Customer</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Destination & Hotel</th>
                <th className="p-4 font-medium">Flight Details</th>
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 pr-6 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/50">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold mb-2"></div>
                    <p>Loading records...</p>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/50">
                    No records found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 pl-6">
                      <p className="font-medium">{booking.full_name}</p>
                      <p className="text-xs text-white/40">ID: #{booking.id.toString().padStart(4, '0')}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{booking.phone}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-gold">{booking.destination}</p>
                      <p className="text-xs text-white/60">{booking.hotel_name} • ${booking.price}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm capitalize">{booking.flight_class}</p>
                      <p className="text-xs text-white/60 capitalize">{booking.flight_type}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{new Date(booking.created_at).toLocaleDateString()}</p>
                      <p className="text-xs text-white/40">{new Date(booking.created_at).toLocaleTimeString()}</p>
                    </td>
                    <td className="p-4 pr-6 text-right relative">
                      <div className="relative inline-flex items-center gap-1 cursor-pointer group/status">
                        <select 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        <ChevronDown className="w-3 h-3 text-white/40 group-hover/status:text-white" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
