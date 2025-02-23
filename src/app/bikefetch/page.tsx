import ClientComponent from './fetch';

interface Station {
  station_id: string;
  name: string;
  // Add other properties as needed
}

const getApi = async (): Promise<Station[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_BIKE_API);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const newData = await response.json();
  return newData.data.stations;
};

export default async function DemoPage() {
  const initialData = await getApi();

  return <ClientComponent initialData={initialData} />;
}