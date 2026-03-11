"use client";

export default function MobileBookingButton() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-stone-100 z-50">
      <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30">
        Prenota Ora
      </button>
    </div>
  );
}
