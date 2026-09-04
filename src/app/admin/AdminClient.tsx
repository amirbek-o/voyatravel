"use client";

import { Database, LogOut } from "lucide-react";

export default function AdminClient({ bookings }: { bookings: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 text-purple-600 p-2 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Booking Logs</h1>
        </div>
        <a href="/admin" className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-medium transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </a>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Destination</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Flight</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No bookings found in the database.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-slate-900">#{booking.id}</td>
                    <td className="p-4 text-sm text-slate-700 font-semibold">{booking.full_name}</td>
                    <td className="p-4 text-sm text-slate-600">{booking.phone}</td>
                    <td className="p-4 text-sm text-slate-800">{booking.destination}</td>
                    <td className="p-4 text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold mb-1">
                        {booking.flight_class}
                      </span>
                      <br />
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                        {booking.flight_type}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                      {new Date(booking.created_at).toLocaleString()}
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
