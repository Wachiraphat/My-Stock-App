import { useInventory } from '../hooks/useInventory';

const Dashboard = () => {
  const { products } = useInventory();
  const totalItems = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">ภาพรวมคลังสินค้า</h1>
        <p className="text-slate-500 mt-2 text-lg">สรุปสถานะสต๊อกสินค้าทั้งหมดของคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-hover hover:shadow-md">
          <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">สินค้าทั้งหมด</span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-800">{totalItems}</span>
            <span className="text-slate-400 font-medium">รายการ</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-hover hover:shadow-md">
          <span className="text-emerald-500 font-bold text-sm uppercase tracking-widest">มูลค่ารวมในคลัง</span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-800">{totalValue.toLocaleString()}</span>
            <span className="text-slate-400 font-medium">บาท</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-hover hover:shadow-md">
          <span className="text-rose-500 font-bold text-sm uppercase tracking-widest">สินค้าที่หมดสต๊อก</span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-rose-500">{outOfStock}</span>
            <span className="text-slate-400 font-medium">รายการ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;