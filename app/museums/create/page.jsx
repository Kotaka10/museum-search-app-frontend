'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

function InputField({ label, name, type = "text", placeholder, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 border focus:ring-2 focus:ring-orange-500 focus:outline-none rounded"
            />
        </div>
    );
};


export default function CreateMuseumPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const { token } = useAuth();
    const [form, setForm] = useState({
        name: '',
        address: '',
        prefecture: '',
		phoneNumber: '',
		exhibition: '',
		museumUrl: '',
		exhibitionUrl: '',
		schedule: '',
		description: '',
		openingHours: '',
		closingDays: '',
		admissionFee: '',
		access: '',
		latitude: '',
		longitude: '',
		category: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
					"Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("美術館の作成に失敗しました");
            }

            router.push("/");
            alert("美術館が「承認待ち美術館」として正常に登録されました。ステータスはマイページで確認してください");
        } catch (err) {
            setError(err.message || "美術館の作成に失敗しました");
        }

        
        if (!form.name.trim()) {
            setError("美術館名を入力してください");
            return;
        }
        if (!form.exhibition.trim()) {
            setError("展示名を入力してください");
            return;
        }
        if (!form.address.trim()) {
            setError("住所を入力してください");
            return;
        }
        if (form.name.length > 100 ) {
            setError('美術館名は100文字以下で登録してください');
        }
        if (form.exhibition.length > 100 ) {
            setError('展覧会名は100文字以下で登録してください');
        }
        if (form.schedule.length > 100 ) {
            setError('スケジュールは100文字以下で登録してください');
        }
        if (form.category.length > 100 ) {
            setError('カテゴリーは100文字以下で登録してください');
        }
        if (form.exhibitionUrl.length > 100 ) {
            setError('美術館名は100文字以下で登録してください');
        }
        if (form.museumUrl.length > 100 ) {
            setError('美術館名は100文字以下で登録してください');
        }
        if (form.address.length > 100 ) {
            setError('住所は100文字以下で登録してください');
        }
        if (form.prefecture.length > 10 ) {
            setError('都道府県は10文字以下で登録してください');
        }
        if (form.phoneNumber.length > 15 ) {
            setError('電話番号は10文字以下で登録してください');
        }
        if (form.openingHours.length > 500 ) {
            setError('開館時間は500文字以下で登録してください');
        }
        if (form.closingDays.length > 500 ) {
            setError('休館日は500文字以下で登録してください');
        }
        if (form.access.length > 500 ) {
            setError('アクセスは500文字以下で登録してください');
        }
        if (form.admissionFee.length > 1000 ) {
            setError('入館料は1000文字以下で登録してください');
        }
        if (form.description.length > 1500 ) {
            setError('展示説明は100文字以下で登録してください');
        }
    };

    return (
        <div className="bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-100">
            <div className="max-w-2xl mx-auto p-4">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold my-4">🎨美術館を登録</h1>
                    <p className="text-orange-500 mb-4">美術館を登録するには会員登録orログインが必要です</p>
                    <Link href="/users/register" className="text-gray-700 hover:underline">会員登録へ</Link>
                    <Link href="/users/login" className="text-gray-700 my-2 hover:underline">ログインへ</Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField label="美術館名" name="name" value={form.name} onChange={handleChange} placeholder="美術館名を入力" required maxLength={100} />
                    <InputField label="展示名" name="exhibition" value={form.exhibition} onChange={handleChange} placeholder="展示名を入力" required maxLength={100} />
                    <InputField label="住所" name="address" value={form.address} onChange={handleChange} placeholder="住所を入力" required maxLength={100} />
                    <InputField label="都道府県" name="prefecture" value={form.prefecture} onChange={handleChange} placeholder="都道府県を入力(空欄でも可)" maxLength={10} />
                    <InputField label="電話番号" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} type="tel" placeholder="電話番号を入力(空欄でも可)" maxLength={15} />
                    <InputField label="美術館URL" name="museumUrl" value={form.museumUrl} onChange={handleChange} type="url" placeholder="美術館のURLを入力(空欄でも可)" maxLength={100} />
                    <InputField label="展示URL" name="exhibitionUrl" value={form.exhibitionUrl} onChange={handleChange} type="url" placeholder="展示のURLを入力(空欄でも可)" maxLength={100} />
                    <InputField label="スケジュール" name="schedule" value={form.schedule} onChange={handleChange} placeholder="スケジュールを入力(空欄でも可)" maxLength={100} />
                    <div>
                        <label className="block text-sm font-medium mb-1">展示内容</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="展示内容の説明を入力(空欄でも可)"
                            className="w-full p-2 border focus:ring-2 focus:ring-orange-500 focus:outline-none rounded"
                            rows="4"
                            maxLength={1500}
                        />
                    </div>
                    <InputField label="開館時間" name="openingHours" value={form.openingHours} onChange={handleChange} placeholder="開館時間を入力(空欄でも可)" maxLength={500} />
                    <InputField label="休館日" name="closingDays" value={form.closingDays} onChange={handleChange} placeholder="休館日を入力(空欄でも可)" maxLength={500} />
                    <InputField label="入館料" name="admissionFee" value={form.admissionFee} onChange={handleChange} placeholder="入館料を入力(空欄でも可)" maxLength={1000} />
                    <InputField label="アクセス" name="access" value={form.access} onChange={handleChange} placeholder="アクセス情報を入力(空欄でも可)" maxLength={500} />
                    <InputField label="緯度" name="latitude" value={form.latitude} onChange={handleChange} type="number" placeholder="緯度を入力(空欄でも可)" step="any" />
                    <InputField label="経度" name="longitude" value={form.longitude} onChange={handleChange} type="number" placeholder="経度を入力(空欄でも可)" step="any" />
                    <InputField label="カテゴリー" name="category" value={form.category} onChange={handleChange} placeholder="カテゴリーを入力(空欄でも可)" maxLength={100} />
                    <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">登録</button>
                </form>

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}