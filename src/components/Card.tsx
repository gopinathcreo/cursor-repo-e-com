import Image from 'next/image';

interface CardProps {
  image: string;
  name: string;
  mrp: number;
  offerPrice: number;
}

export default function Card({ image, name, mrp, offerPrice }: CardProps) {
  const discount = ((mrp - offerPrice) / mrp) * 100;

  return (
    <div className="border rounded-lg shadow-md p-4">
      <Image src={image} alt={name} width={200} height={200} className="rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-sm text-gray-500">MRP: ${mrp.toFixed(2)}</p>
      <p className="text-sm text-green-600">Offer Price: ${offerPrice.toFixed(2)}</p>
      <p className="text-sm text-red-500">Save {discount.toFixed(2)}%</p>
    </div>
  );
} 