"use client";

import { useEffect, useState } from "react";

interface Station {
  station_id: string;
  name: string;
  capacity: number
  // Add other properties as needed
}

interface ClientComponentProps {
  initialData: Station[];
}

const getApi = async (): Promise<Station[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_BIKE_API);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const newData = await response.json();
  return newData.data.stations;
};

export default function ClientComponent({ initialData }: ClientComponentProps) {
  const [data, setData] = useState<Station[]>(initialData);

  const fetchData = async () => {
    try {
      const newData = await getApi();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Data from API</h1>
      <p>station name - station capacity</p>
      <ul>
        {data.map((item) => (
          <li key={item.station_id}>{item.name} - {item.capacity}</li>
        ))}
        {console.log(data[0].name)}
        {console.log(data[1].name)}
      </ul>
    </div>
  );
}
