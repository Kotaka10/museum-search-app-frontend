import '@/styles/globals.css';
import Header from '@/app/components/common/Header';
import Footer from '@/app/components/common/Footer';
import { AuthProvider } from '@/app/context/AuthContext';
import GoogleMapsProvider from '@/app/providers/GoogleMapsProvider';


export const metadata = {
  title: "美術館検索アプリ",
  description: "全国にある美術館などを検索・閲覧・コメントできるアプリです。自分の知っている美術館を登録することもできます。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-900 font-sans">
        <AuthProvider>
          <GoogleMapsProvider>
            <Header />
            {children}
            <Footer />
          </GoogleMapsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
