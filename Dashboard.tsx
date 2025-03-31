import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/custom/sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
];

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    fetch("https://your-backend-url.com/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar>
        <Sidebar.Item icon={Package} label="Produk" />
        <Sidebar.Item icon={ShoppingCart} label="Pesanan" />
        <Sidebar.Item icon={Settings} label="Pengaturan" />
        <Sidebar.Item icon={LogOut} label="Logout" onClick={handleLogout} />
      </Sidebar>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard Toko</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">Total Penjualan</h2>
              <p className="text-2xl font-bold">Rp 15.000.000</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">Pesanan Baru</h2>
              <p className="text-2xl font-bold">23</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">Produk Aktif</h2>
              <p className="text-2xl font-bold">{products.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    const response = await fetch("https://your-backend-url.com/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Instruksi reset password telah dikirim ke email Anda.");
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <Button className="w-full mt-4" onClick={handleReset}>Kirim Reset Link</Button>
      </div>
    </div>
  );
}