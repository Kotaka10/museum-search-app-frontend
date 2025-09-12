import NearbyMuseumsClient from "./ui/NearbyMuseumsClient";

export default function NearbyMuseumsPage() {
    
    return (
        <main className="p-4">
            <h1 className="text-2xl text-center my-4">
                <span className="inline-block bg-gradient-to-r from-sky-100 via-white to-sky-100 px-6 py-3 rounded-2xl shadow-md">
                    現在地から近い美術館
                </span>
            </h1>
            <h2 className="text-center text-lg text-gray-800 mb-4">
                <p>地図上に現在地から半径50kmの美術館を表示しています。</p>
                <p>ピンをクリックすると詳細を確認できます。</p>
                <p className="text-red-500">※ピンが見えない場合は地図を移動するか範囲を拡大してください。</p>
                <p className="text-red-500">※サークル内にピンが見えない場合は半径50kmに美術館等が登録されていません。</p>
            </h2>
            <NearbyMuseumsClient />
        </main>
    )
}