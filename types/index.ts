import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?:string
  rightIcon?:string
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  selected: string;
  setSelected: (selected: string) => void;
}

export interface CarCardProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface FilterProps{
  manufacturer: string;
    year: number;
    fuel: string;
    limit: number;
    model: string;
}
export interface optionProps{
  title:string;
  value:string;
}
export interface CustomFilterProps<T>{
  options: optionProps[]
  setFilter: (selected: T) => void;
}
export interface showMoreProps {
  pageNumber:number;
  isNext:boolean
  setLimit: (limit: number) => void;
}
export interface SearchBarProps {
  setManuFacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}