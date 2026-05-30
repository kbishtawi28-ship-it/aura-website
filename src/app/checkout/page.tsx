"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// قائمة المحافظات الأردنية لتسهيل الاختيار على الزبون
const JORDAN_CITIES = [
  "عمان", "إربد", "الزرقاء", "البلقاء", "العقبة", 
  "مأدبا", "المفرق", "جرش", "عجلون", "الكرك", "الطفيلة", "معان"
];

// الرابط السحري المباشر لجوجل شيتس الخاص بك كرم
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxd0g-xu6RWSTrspepetI4prLsIciSgAX0MK6aJUYlRamx7QVuHye97D3dM_Wg60CH5XQ/exec";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "عمان",
    address: "",
    product: "مطرة AURA الذكية - 1.2 لتر",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إرسال البيانات مباشرة إلى سكربت جوجل شيتس
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // ضرورية لمنع مشاكل الـ CORS مع جوجل
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتس آب.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md border border-zinc-800 p-8 rounded-2xl bg-zinc-950"
        >
          <h2 className="text-3xl font-bold text-green-500 mb-4">تم استلام طلبك بنجاح! 🎉</h2>
          <p className="text-zinc-400 mb-6 font-sans">
            شكراً لك على ثقتك بـ <span className="text-white font-bold">AURA</span>. سيقوم فريق المبيعات بالتواصل معك عبر الهاتف لتأكيد الشحن والتوصيل خلال 24 ساعة.
          </p>
          <Link 
            href="/"
            className="inline-block w-full py-3 bg-white text-black font-bold font-sans rounded-xl hover:bg-zinc-200 transition-colors"
          >
            العودة للموقع الرئيسي
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 border border-zinc-800 p-8 rounded-2xl bg-zinc-950">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            تأكيد طلب الشراء 🛒
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400 font-sans">
            الدفع عند الاستلام داخل جميع محافظات المملكة
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1 font-sans">الاسم الكامل</label>
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-zinc-800 bg-black rounded-xl placeholder-zinc-600 text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
                placeholder="مثال: كرم البشتاوي"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1 font-sans">رقم الهاتف</label>
              <input
                type="tel"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-zinc-800 bg-black rounded-xl placeholder-zinc-600 text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm text-left"
                placeholder="07XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1 font-sans">المحافظة</label>
              <select
                className="block w-full px-3 py-3 border border-zinc-800 bg-black rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm font-sans"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {JORDAN_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1 font-sans">العنوان بالتفصيل</label>
              <textarea
                required
                rows={2}
                className="appearance-none relative block w-full px-3 py-3 border border-zinc-800 bg-black rounded-xl placeholder-zinc-600 text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
                placeholder="مثال: إربد - منطقة زبدة - بجانب..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors font-sans disabled:opacity-50"
            >
              {loading ? "جاري إرسال الطلب..." : "تأكيد الطلب وشحن مجاني 🚚"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
