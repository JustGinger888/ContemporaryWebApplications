import { getMenu, getEstablishment } from "../../lib/firebase";
import MenuCard from "../../components/MenuCard";
import React, { useState } from 'react';


export async function getServerSideProps({ query }) {
  const id = query.establishment;
  const array1 = await getMenu(id);
  const array2 = await getEstablishment(id);

  // JSON serializable data
  let establishment = null;
  let menu = null;

  if (array1) {
    menu = array1;
  }
  if (array2) {
    establishment = array2[0];
  }

  return {
    props: { menu, establishment }, // will be passed to the page component as props
  };
}

export default function EstablishmentMenuPage({ establishment, menu }) {
  console.log(establishment);
  let food = [];
  let drink = [];
  let snack = [];
  
  const [showDrink, setDrink] = useState(0);
  const [showFood, setFood] = useState(0);
  const [showSnack, setSnack] = useState(0);

  return (
    <div>
      <div className="container mx-auto">
        <div className="rounded overflow-hidden shadow-lg m-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <img
              className="w-full h-80"
              src={establishment.url}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4 col-span-2">
              <div className="font-bold text-xl text-red-500 mb-2">
                {establishment.name}
              </div>
              <p className="text-gray-400 text-base pb-2 ">
                {establishment.type}
              </p>
              <p className="text-gray-700 text-base">{establishment.desc}</p>
            </div>
          </div>
        </div>

        {showDrink > 0 && <div className="font-bold text-xl mb-2">Drink</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {drink}
        </div>
        {showFood > 0 && <div className="font-bold text-xl mb-2">Food</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {food}
        </div>
        {showSnack > 0 && <div className="font-bold text-xl mb-2">Snack</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {snack}
        </div>

        {menu.map((e) => {
          return e.ctg == "food" ? (
            food.push(<MenuCard key={e.id} item={e} id={establishment.id} />),
            showFood == 0 && setFood(showFood + 1)
          ) : (
            e.ctg == "drink" ? (
              drink.push(<MenuCard key={e.id} item={e} id={establishment.id} />),
              showDrink == 0 && setDrink(showDrink + 1)
            ) : (
              snack.push(<MenuCard key={e.id} item={e} id={establishment.id} />),
              showSnack == 0 && setSnack(showSnack + 1)
            )
          );
        })}
      </div>
    </div>
  );
}
