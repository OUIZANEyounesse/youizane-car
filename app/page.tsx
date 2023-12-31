"use client";
import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from "@/components";
import Image from 'next/image'
import { fetchCars } from "@/utils";
import { fuels, manufacturers, yearsOfProduction } from "../constants/index";
import { FilterProps } from "@/types";
import { useEffect, useState } from "react";

export default async function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //search states
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  //pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: searchManufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: searchModel || "",
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCars();
  }, [fuel, year, limit, searchManufacturer, searchModel]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar 
            setManuFacturer ={setSearchManufacturer}
            setModel={setSearchModel}
          />

          <div className="home__filter-container">
            <CustomFilter  options={fuels} setFilter={setFuel} />
            <CustomFilter  options={yearsOfProduction}  setFilter={setYear}/>
          </div>
        </div>

        {allCars.length> 0? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/asset/loader.svg"
                  alt="loader"
                  width ={50}
                  height ={50}
                  className='object-contain'
                />
              </div>
            )}
            <ShowMore
              pageNumber={(limit) / 10}
              isNext={(limit) > allCars.length}
              setLimit ={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl">Oops, no results</h2>
            <p></p>
          </div>
        )}
      </div>
    </main>
  );
}
