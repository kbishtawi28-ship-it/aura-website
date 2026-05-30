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

export default function Admin() {
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

  const statusMap: Record<string, string> = {
    pending: "معلق",
    completed: "مكتمل",
    cancelled: "ملغى"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي الطلبات</CardTitle>
              <Package className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalOrders || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">الطلبات المعلقة</CardTitle>
              <Clock className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingOrders || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">الطلبات المكتملة</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.completedOrders || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي الإيرادات</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalRevenue || 0} JOD</div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="px-6 py-4">رقم</th>
                  <th className="px-6 py-4">اسم العميل</th>
                  <th className="px-6 py-4">الهاتف</th>
                  <th className="px-6 py-4">العنوان</th>
                  <th className="px-6 py-4">اللون</th>
                  <th className="px-6 py-4">الكمية</th>
                  <th className="px-6 py-4">الإجمالي</th>
                  <th className="px-6 py-4">التاريخ</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map(order => (
                  <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">#{order.id}</td>
                    <td className="px-6 py-4">{order.customerName}</td>
                    <td className="px-6 py-4 dir-ltr text-right">{order.phone}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={order.address}>{order.address}</td>
                    <td className="px-6 py-4">{order.color}</td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4 font-bold">{order.totalPrice} JOD</td>
                    <td className="px-6 py-4">{format(new Date(order.createdAt), "dd MMM yyyy", { locale: ar })}</td>
                    <td className="px-6 py-4">
                      <Select 
                        defaultValue={order.status} 
                        onValueChange={(val) => handleStatusChange(order.id, val)}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                          <SelectValue placeholder="الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">معلق</SelectItem>
                          <SelectItem value="completed">مكتمل</SelectItem>
                          <SelectItem value="cancelled">ملغى</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {orders?.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-gray-500">لا توجد طلبات حتى الآن</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
