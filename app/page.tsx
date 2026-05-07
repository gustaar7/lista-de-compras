'use client';

import { useState, useEffect } from 'react';
import { ShoppingList } from './components/ShoppingList';
import { ProductModal } from './components/ProductModal';
import { ThemeToggle } from './components/ThemeToggle';
import { Product } from './types/product';
import { api } from './lib/api';
import { Plus, ShoppingCart, Sparkles } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch {
      console.error('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      console.error('Erro ao deletar produto');
    }
  };

  const handleSave = async (data: Omit<Product, 'id'>) => {
    try {
      if (editingProduct) {
        const updated = await api.updateProduct(editingProduct.id, data);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updated : p))
        );
      } else {
        const created = await api.createProduct(data);
        setProducts((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch {
      console.error('Erro ao salvar produto');
    }
  };

  const totalItems = products.reduce((acc, p) => acc + p.quantidade, 0);

  return (
    <div className="app-wrapper">
      <div className="noise-overlay" />

      <header className="header">
        <div className="header-inner">
          <div className="logo-group">
            <div className="logo-icon">
              <ShoppingCart size={22} />
            </div>
            <div>
              <h1 className="logo-title">Lista<span> de Compras</span></h1>
              <p className="logo-sub">sua lista inteligente</p>
            </div>
          </div>

          <div className="header-right">
            <div className="stats-pill">
              <Sparkles size={13} />
              <span>{products.length} itens · {totalItems} un.</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="main">
        <div className="section-header">
          <div>
            <h2 className="section-title">Lista de Compras</h2>
            <p className="section-desc">
              {loading ? 'Carregando...' : products.length === 0 ? 'Nenhum produto ainda. Adicione um!' : `${products.length} produto${products.length !== 1 ? 's' : ''} na lista`}
            </p>
          </div>
          <button className="btn-add" onClick={handleCreate}>
            <Plus size={18} />
            <span>Adicionar</span>
          </button>
        </div>

        <ShoppingList
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <ProductModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}