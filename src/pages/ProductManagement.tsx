import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';

const ProductManagement = () => {
  const { products, addProduct, updateQuantity, deleteProduct } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) return;
    addProduct(formData.name, Number(formData.price), Number(formData.quantity));
    setFormData({ name: '', price: '', quantity: '' });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800">จัดการรายการสินค้า</h1>
        <input 
          type="text" 
          placeholder="ค้นหาชื่อสินค้า..." 
          className="w-full md:w-80 bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Input Form Card */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6">บันทึกสินค้าใหม่</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="ชื่อสินค้า" required />
          <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="ราคาต่อหน่วย" required />
          <input type="number" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="จำนวน" required />
          <button type="submit" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-700 transition-all active:scale-95">เพิ่มสินค้าเข้าสต๊อก</button>
        </form>
      </div>

      {/* Product Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(p => (
          <div key={p.id} className={`p-8 rounded-3xl border transition-all ${p.quantity === 0 ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-bold text-xl text-slate-800">{p.name}</h3>
              {p.quantity === 0 && <span className="text-rose-500 font-bold text-xs bg-rose-100 px-3 py-1 rounded-full uppercase tracking-tighter">หมดสต๊อก</span>}
            </div>
            
            <p className="text-3xl font-black text-slate-900 mb-8">{p.price.toLocaleString()} <span className="text-sm font-normal text-slate-400 uppercase">THB</span></p>
            
            <div className="flex items-center justify-between border-t border-slate-50 pt-6">
              <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-2xl">
                <button onClick={() => updateQuantity(p.id, -1)} className="text-slate-400 hover:text-slate-900 font-bold text-xl transition-colors">−</button>
                <span className="w-6 text-center font-black text-slate-800">{p.quantity}</span>
                <button onClick={() => updateQuantity(p.id, 1)} className="text-slate-400 hover:text-slate-900 font-bold text-xl transition-colors">+</button>
              </div>
              <button onClick={() => deleteProduct(p.id)} className="text-slate-400 hover:text-rose-500 font-medium text-sm transition-colors uppercase tracking-widest">ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;