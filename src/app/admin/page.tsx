"use client";

import { useState, useEffect } from "react";
import { Users, Clock, CheckCircle, Search, ChevronDown, RefreshCw, Lock, Plane, Plus, X, Edit2, Check } from "lucide-react";

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

type Tour = {
  id: number;
  destination: { name: string; town: string };
  hotel: { name: string };
  package: { price: number; currency: string; pricePerPax: number; pax: number };
  duration: { nights: number };
  included: { flightIn: boolean; flightOut: boolean; roomType: string };
  imageUrl: string;
};

export default function AdminDashboard() {
  // Auth state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState<"crm" | "tours">("crm");

  // CRM state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isCrmLoading, setIsCrmLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Tours state
  const [tours, setTours] = useState<Tour[]>([]);
  const [isToursLoading, setIsToursLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTourId, setEditingTourId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    target_destination: "",
    hotel_title: "",
    price: "",
    duration_nights: "",
    room_categories: "",
    flight_parameters: "",
    image_url: ""
  });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "voyavoyaturizm") {
      setIsUnlocked(true);
      fetchBookings();
    }
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      if (activeTab === "crm") fetchBookings();
      if (activeTab === "tours") fetchTours();
    }
  }, [activeTab, isUnlocked]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "voyavoyaturizm") {
      localStorage.setItem("adminAuth", password);
      setIsUnlocked(true);
      fetchBookings();
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const fetchBookings = async () => {
    try {
      setIsCrmLoading(true);
      const res = await fetch("/api/admin/bookings");
      const json = await res.json();
      if (json.success) setBookings(json.data);
    } catch (error) {
      console.error("Failed to load records:", error);
    } finally {
      setIsCrmLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    try {
      await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (error) {
      fetchBookings();
    }
  };

  const fetchTours = async () => {
    try {
      setIsToursLoading(true);
      const res = await fetch("/api/tours?admin=true");
      const json = await res.json();
      if (json.success) setTours(json.data);
    } catch (error) {
      console.error("Failed to load tours:", error);
    } finally {
      setIsToursLoading(false);
    }
  };

  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          duration_nights: Number(formData.duration_nights)
        })
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        setFormData({ target_destination: "", hotel_title: "", price: "", duration_nights: "", room_categories: "", flight_parameters: "", image_url: "" });
        fetchTours();
      }
    } catch (error) {
      console.error("Error creating tour:", error);
    }
  };

  const handleUpdateTour = async (id: number) => {
    try {
      await fetch("/api/tours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          ...formData,
          price: Number(formData.price),
          duration_nights: Number(formData.duration_nights)
        })
      });
      setEditingTourId(null);
      fetchTours();
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  const startEditing = (tour: Tour) => {
    setFormData({
      target_destination: `${tour.destination.town}, ${tour.destination.name}`,
      hotel_title: tour.hotel.name,
      price: tour.package.price.toString(),
      duration_nights: tour.duration.nights.toString(),
      room_categories: tour.included.roomType,
      flight_parameters: tour.included.flightIn ? "Round Trip" : "One Way",
      image_url: tour.imageUrl
    });
    setEditingTourId(tour.id);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-brand-deep flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-gold/20 blur-[50px] rounded-full pointer-events-none"></div>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
              <Lock className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Voya Vibe Portal</h1>
          <p className="text-white/50 text-center text-sm mb-8">Admin paroli / Пароль админа</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passphrase..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {authError && <p className="text-red-400 text-xs mt-2 ml-1">Incorrect passphrase</p>}
            </div>
            <button type="submit" className="w-full bg-gold hover:bg-gold/90 text-brand-deep font-bold rounded-xl px-4 py-3 transition-colors">
              Unlock Terminal
            </button>
          </form>
        </div>
      </div>
    );
  }

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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-gold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            Voya Portal Central
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Admin Gateway</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              localStorage.removeItem("adminAuth");
              setIsUnlocked(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors text-sm font-medium"
          >
            Lock Terminal
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-8 flex gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("crm")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === "crm" ? "bg-gold text-brand-deep shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "text-white/60 hover:bg-white/5"
          }`}
        >
          CRM Dashboard
        </button>
        <button
          onClick={() => setActiveTab("tours")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
            activeTab === "tours" ? "bg-gold text-brand-deep shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "text-white/60 hover:bg-white/5"
          }`}
        >
          <Plane className="w-4 h-4" /> Tour Catalog Manager
        </button>
      </div>

      {/* CRM TAB */}
      {activeTab === "crm" && (
        <>
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

          <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-medium">Booking Records</h2>
              <div className="flex items-center gap-4 w-full sm:w-auto">
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
                <button onClick={fetchBookings} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:text-gold transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-xs uppercase tracking-wider text-white/50 font-semibold border-b border-white/10">
                    <th className="p-4 pl-6 font-medium">Customer</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Destination & Hotel</th>
                    <th className="p-4 font-medium">Timestamp</th>
                    <th className="p-4 pr-6 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {isCrmLoading ? (
                    <tr><td colSpan={5} className="p-8 text-center text-white/50">Loading records...</td></tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-white/50">No records found.</td></tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 pl-6">
                          <p className="font-medium">{booking.full_name}</p>
                          <p className="text-xs text-white/40">ID: #{booking.id}</p>
                        </td>
                        <td className="p-4"><p className="text-sm">{booking.phone}</p></td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-gold">{booking.destination}</p>
                          <p className="text-xs text-white/60">{booking.hotel_name}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{new Date(booking.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <select 
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)} bg-transparent focus:outline-none cursor-pointer [&>option]:bg-brand-deep`}
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* TOURS TAB */}
      {activeTab === "tours" && (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Live Catalog Manager</h2>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-brand-deep px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" /> Add New Package Tour
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-xs uppercase tracking-wider text-white/50 font-semibold border-b border-white/10">
                    <th className="p-4 pl-6 font-medium">Hotel & Destination</th>
                    <th className="p-4 font-medium">Price (UZS)</th>
                    <th className="p-4 font-medium">Duration</th>
                    <th className="p-4 font-medium">Room & Flight</th>
                    <th className="p-4 pr-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {isToursLoading ? (
                    <tr><td colSpan={5} className="p-8 text-center text-white/50">Loading catalog...</td></tr>
                  ) : tours.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-white/50">No active CMS packages found.</td></tr>
                  ) : (
                    tours.map((tour) => (
                      <tr key={tour.id} className="hover:bg-white/5 transition-colors group">
                        {editingTourId === tour.id ? (
                          <td colSpan={5} className="p-6 bg-white/10 relative">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <input type="text" placeholder="Target Destination" className="col-span-1 bg-black/30 border border-white/20 rounded-lg p-2 text-sm" value={formData.target_destination} onChange={e => setFormData({...formData, target_destination: e.target.value})} />
                              <input type="text" placeholder="Hotel Title" className="col-span-1 md:col-span-2 bg-black/30 border border-white/20 rounded-lg p-2 text-sm" value={formData.hotel_title} onChange={e => setFormData({...formData, hotel_title: e.target.value})} />
                              <input type="number" placeholder="Price (UZS)" className="col-span-1 bg-black/30 border border-white/20 rounded-lg p-2 text-sm" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                              <input type="number" placeholder="Nights" className="col-span-1 bg-black/30 border border-white/20 rounded-lg p-2 text-sm" value={formData.duration_nights} onChange={e => setFormData({...formData, duration_nights: e.target.value})} />
                              <input type="text" placeholder="Room Type" className="col-span-1 bg-black/30 border border-white/20 rounded-lg p-2 text-sm" value={formData.room_categories} onChange={e => setFormData({...formData, room_categories: e.target.value})} />
                              <input type="text" placeholder="Flight params" className="col-span-1 bg-black/30 border border-white/20 rounded-lg p-2 text-sm" value={formData.flight_parameters} onChange={e => setFormData({...formData, flight_parameters: e.target.value})} />
                              <input type="text" placeholder="Image URL" className="col-span-1 md:col-span-3 bg-black/30 border border-white/20 rounded-lg p-2 text-sm" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                              <div className="col-span-1 flex justify-end items-end gap-2">
                                <button onClick={() => setEditingTourId(null)} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs"><X className="w-4 h-4"/></button>
                                <button onClick={() => handleUpdateTour(tour.id)} className="px-3 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 rounded-lg text-xs font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Save</button>
                              </div>
                            </div>
                          </td>
                        ) : (
                          <>
                            <td className="p-4 pl-6">
                              <p className="font-medium text-white">{tour.hotel.name}</p>
                              <p className="text-xs text-white/50">{tour.destination.town}, {tour.destination.name}</p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-gold font-mono">{tour.package.price.toLocaleString()} UZS</p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm">{tour.duration.nights} Nights</p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm truncate max-w-[150px]">{tour.included.roomType}</p>
                              <p className="text-xs text-white/50">{tour.included.flightIn ? "Round Trip" : "One Way"}</p>
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <button 
                                onClick={() => startEditing(tour)}
                                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-white/5 hover:bg-white/20 rounded-md border border-white/10 transition-colors"
                              >
                                <Edit2 className="w-3 h-3" /> Edit / Редактировать
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Tour Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0D2B45] border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Package Tour</h2>
            <form onSubmit={handleCreateTour} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-white/60 font-medium">Hotel Title</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none" value={formData.hotel_title} onChange={e => setFormData({...formData, hotel_title: e.target.value})} placeholder="e.g. Rixos Premium Belek" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/60 font-medium">Target Destination</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none" value={formData.target_destination} onChange={e => setFormData({...formData, target_destination: e.target.value})} placeholder="e.g. Antalya, Turkey" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/60 font-medium">Price in Uzbek Sums</label>
                <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. 15000000" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/60 font-medium">Duration Nights</label>
                <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none" value={formData.duration_nights} onChange={e => setFormData({...formData, duration_nights: e.target.value})} placeholder="e.g. 7" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/60 font-medium">Room Categories</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none" value={formData.room_categories} onChange={e => setFormData({...formData, room_categories: e.target.value})} placeholder="e.g. Standard Sea View" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/60 font-medium">Flight Parameters</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none" value={formData.flight_parameters} onChange={e => setFormData({...formData, flight_parameters: e.target.value})} placeholder="e.g. Round Trip, Charter" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/60 font-medium">Image URL Text Block</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="e.g. /images/hotels/rixos.jpg or https://..." />
              </div>
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full bg-gold text-brand-deep font-bold text-lg py-3 rounded-xl shadow-lg hover:bg-gold/90 transition-colors">
                  Publish to Live Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
