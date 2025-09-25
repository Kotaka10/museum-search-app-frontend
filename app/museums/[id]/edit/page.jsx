'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

function InputField({ label, name, type = 'text', value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />
    </div>
  );
}

export default function EditMuseumPage() {
	const router = useRouter();
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
	const { token } = useAuth();

	const [form, setForm] = useState({
		name: '',
		address: '',
		prefecture: '',
		phoneNumber: '',
		exhibition: '',
		museumUrl: '',
		exhibitionUrl: '',
		startDate: '',
		endDate: '',
		description: '',
		openingHours: '',
		closingDays: '',
		admissionFee: '',
		access: '',
		latitude: '',
		longitude: '',
		category: '',
	});
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchMuseum = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/${id}`, {
					headers: {
						"Authorization": `Bearer ${token}`
					},
				});
				if (!res.ok) throw new Error('美術館の取得に失敗しました');
				const data = await res.json();
				setForm(data);
			} catch (err) {
				setError(err.message);
			}
		};
		fetchMuseum();
	}, [id]);

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		setForm(prevForm => ({
			...prevForm,
			[name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				headers: {
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify(form),
			});

			if (!res.ok) throw new Error('更新に失敗しました');
			alert('更新が完了しました');
			router.push('/');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">美術館情報を編集</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				<InputField label="美術館名" name="name" value={form.name || ''} onChange={handleChange} />
				<InputField label="展示名" name="exhibition" value={form.exhibition || ''} onChange={handleChange} />
				<InputField label="住所" name="address" value={form.address || ''} onChange={handleChange} />
				<InputField label="都道府県" name="prefecture" value={form.prefecture || ''} onChange={handleChange} />
				<InputField label="電話番号" name="phoneNumber" value={form.phoneNumber || ''} onChange={handleChange} />
				<InputField label="美術館URL" name="museumUrl" value={form.museumUrl || ''} onChange={handleChange} />
				<InputField label="展示URL" name="exhibitionUrl" value={form.exhibitionUrl || ''} onChange={handleChange} />
				<InputField label="開始日" name="startDate" value={form.startDate || ''} onChange={handleChange} />
				<InputField label="終了日" name="endDate" value={form.endDate || ''} onChange={handleChange} />
				<div>
					<label className="block text-sm font-medium mb-1">説明</label>
					<textarea
						name="description"
						value={form.description || ''}
						onChange={handleChange}
						className="w-full p-2 border rounded h-32 resize-none"
					/>
				</div>
				<InputField label="開館時間" name="openingHours" value={form.openingHours || ''} onChange={handleChange} />
				<InputField label="休館日" name="closingDays" value={form.closingDays || ''} onChange={handleChange} />
				<InputField label="入館料" name="admissionFee" value={form.admissionFee || ''} onChange={handleChange} />
				<InputField label="アクセス" name="access" value={form.access || ''} onChange={handleChange} />
				<InputField label="緯度" name="latitude" type="number" value={form.latitude || ''} onChange={handleChange} />
				<InputField label="経度" name="longitude" type="number" value={form.longitude || ''} onChange={handleChange} />
				<InputField label="カテゴリ" name="category" value={form.category || ''} onChange={handleChange} />

				<button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
					更新する
				</button>
				{error && <p className="text-red-500">{error}</p>}
			</form>
		</div>
	);
}
