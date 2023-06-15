import { CarCardProps, FilterProps } from "@/types";

export async function fetchCars(filters:FilterProps) {

  const {manufacturer, year,model,limit,fuel} = filters;
  const headers = {
    "X-RapidAPI-Key": "91e642332cmsh460d451c8b26acdp19a225jsn4e7d372e699c",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = async (
  car: CarCardProps,
  per_page?: string
) => {
  const url = new URL("https://api.pexels.com/v1/search");
  const { make, model } = car;
  const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || " ";
  // https://api.pexels.com/v1/search?query=Corolla&per_page=1&orientation=landscape

  url.searchParams.append("query", `${make} ${model}`);
  url.searchParams.append("per_page", `${per_page || 1}`);
  url.searchParams.append("orientation", "landscape");

  const headers = {
    Authorization: API_KEY,
  };

  const response = await fetch(url, { headers: headers });

  const result = await response.json();

  if (result.photos.legth < 1) return null;
  return result.photos[0].src.original;
};


export const updateSearchParams = (type:string, value:string)=>{
  const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    const newPathName =`${window.location.pathname}?${searchParams.toString()}`
    return newPathName;
}