'use client';

import { useState } from 'react';
import { Product } from '../types/product';
import { Pencil, Trash2, ShoppingBasket, AlertCircle } from 'lucide-react';

interface Props {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton" style={{ width: '60%', height: 14 }} />
        <div className="skeleton" style={{ width: '85%', height: 11 }} />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div className="skeleton" style={{ width: 34, height: 34, borderRadius: 8 }} />
        <div className="skeleton" style={{ width: 34, height: 34, borderRadius: 8 }} />
      </div>
    </div>
  );
}

function ConfirmDelete({
  productName,
  onConfirm,
  onCancel,
}: {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <Trash2 size={22} />
        </div>
        <p className="confirm-title">Remover produto?</p>
        <p className="confirm-desc">
          <strong>{productName}</strong> será removido da sua lista. Essa ação não pode ser desfeita.
        </p>
        <div className="confirm-actions">
          <button className="btn-confirm-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn-confirm-delete" onClick={onConfirm}>Remover</button>
        </div>
      </div>
    </div>
  );
}

export function ShoppingList({ products, loading, onEdit, onDelete }: Props) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmProduct = products.find((p) => p.id === confirmId);

  if (loading) {
    return (
      <div className="list-container">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <ShoppingBasket size={30} />
        </div>
        <p className="empty-title">Lista vazia por aqui!</p>
        <p className="empty-desc">Toque em "Adicionar" para incluir seu primeiro produto na lista.</p>
      </div>
    );
  }

  return (
    <>
      <div className="api-notice">
        <span className="api-notice-icon"><AlertCircle size={14} /></span>
        <div>
          <strong>Backend não conectado</strong>
          Configure <code>NEXT_PUBLIC_API_URL</code> no <code>.env.local</code> com a URL do seu backend.
        </div>
      </div>

      <div className="list-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-qty-badge">
              <span>{product.quantidade}</span>
              <span className="qty-label">un.</span>
            </div>

            <div className="product-info">
              <p className="product-name">{product.nome}</p>
              {product.descricao && (
                <p className="product-desc">{product.descricao}</p>
              )}
            </div>

            <div className="product-actions">
              <button
                className="btn-icon edit"
                onClick={() => onEdit(product)}
                aria-label="Editar produto"
              >
                <Pencil size={15} />
              </button>
              <button
                className="btn-icon delete"
                onClick={() => setConfirmId(product.id)}
                aria-label="Remover produto"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmId && confirmProduct && (
        <ConfirmDelete
          productName={confirmProduct.nome}
          onConfirm={() => {
            onDelete(confirmId);
            setConfirmId(null);
          }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  );
}
