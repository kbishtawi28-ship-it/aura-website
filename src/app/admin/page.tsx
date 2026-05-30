'use client';

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListOrders, 
  useUpdateOrderStatus, 
  useDeleteOrder, 
  useGetProductSettings, 
  useUpdateProductSettings, 
  useGetOrderStats,
  getListOrdersQueryKey,
  getGetProductSettingsQueryKey,
  getGetOrderStatsQueryKey
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Package, Clock, CheckCircle2, DollarSign, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: orders } = useListOrders({ query: { queryKey: getListOrdersQueryKey() } });
  const { data: stats } = useGetOrderStats({ query: { queryKey: getGetOrderStatsQueryKey() } });
  const { data: settings } = useGetProductSettings({ query: { queryKey: getGetProductSettingsQueryKey() } });
  
  const updateStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();
  const updateSettings = useUpdateProductSettings();

  const [priceInput, setPriceInput] = useState("");

  const handleStatusChange = (id: number, status: string) => {
    updateStatus.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetOrderStatsQueryKey() });
          toast({ title: "تم تحديث الحالة بنجاح" });
        }
      }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      deleteOrder.mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetOrderStatsQueryKey() });
            toast({ title: "تم حذف الطلب" });
          }
        }
      );
    }
  };

  const handleUpdatePrice = () => {
    const newPrice = Number(priceInput);
    if (!newPrice || isNaN(newPrice)) return;
    
    updateSettings.mutate(
      { data: { price: newPrice } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProductSettingsQueryKey() });
          toast({ title: "تم تحديث السعر بنجاح" });
          setPriceInput("");
        }
      }
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم AURA</h1>
          <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-xl shadow-sm border">
            <span className="text-gray-600">السعر الحالي:</span>
            <span className="font-bold text-xl">JOD {settings?.price}</span>
            <div className="flex gap-2 mr-4">
              <Input 
                placeholder="السعر الجديد" 
                value={priceInput} 
                onChange={e => setPriceInput(e.target.value)}
                className="w-32 h-10"
              />
              <Button onClick={handleUpdatePrice} disabled={updateSettings.isPending} className="h-10">
                تحديث
              </Button>
            </div>
          </div>
        </div>

        {/* باقي الكود الخاص بـ Stats والجدول كما هو في النسخة الأصلية */}
        {/* (تأكد من نسخ باقي الكود إلى هنا في ملفك) */}
      </div>
    </div>
  );
}
