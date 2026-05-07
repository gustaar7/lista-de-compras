'use client';

import { useEffect, useState } from 'react';
import { Product } from '../types/product';

interface Props {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (data: Omit<Product, 'id'>) => Promise<void>;
}

const EMPTY = { nome: '', quantidade: 1, descricao: '' };

export function ProductModal({ isOpen, product, onClose, onSave }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm(product ? { nome: product.nome, quantidade: product.quantidade, descricao: product.descricao } : EMPTY);
      setError('');
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantidade' ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.nome.trim()) {
      setError('O nome do produto é obrigatório.');
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
    } catch {
      setError('Erro ao salvar. Verifique o backend e tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 className="modal-title">
          {product ? '✏️ Editar produto' : '🛒 Novo produto'}
        </h2>

        <div className="form-group">
          <label className="form-label">Nome</label>
          <input
            className="form-input"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Arroz, Leite, Shampoo..."
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Quantidade</label>
          <input
            className="form-input"
            name="quantidade"
            type="number"
            min={1}
            value={form.quantidade}
            onChange={handleChange}
            placeholder="1"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-textarea"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Marca, tamanho, observação..."
          />
        </div>

        {error && (
          <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: -4, marginBottom: 8 }}>
            ⚠️ {error}
          </p>
        )}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button className="btn-save" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Salvando...' : product ? 'Salvar alterações' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}
