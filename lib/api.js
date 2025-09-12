export async function getMuseumById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/museums/${id}`);
  if (!res.ok) throw new Error("美術館が見つかりません");
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    prefecture: data.prefecture,
    category: data.category,
    description: data.description,
    exhibition: data.exhibition,
    imageProvider: data.imageProvider,
    exhibitionImage: data.exhibitionImage,
    startDate: data.startDate,
    endDate: data.endDate,
    openingHours: data.openingHours,
    closingDays: data.closingDays,
    admissionFee: data.admissionFee,
    exhibitionUrl: data.exhibitionUrl,
    museumUrl: data.museumUrl,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    access: data.access,
    phoneNumber: data.phoneNumber
  };
}