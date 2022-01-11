import { getUserOrders, firestore } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import React, { useState, useEffect } from "react";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import OrderCard from "../../components/OrderCard";

export async function getServerSideProps({ query }) {
  const id = query.id;

  return {
    props: { id }, // will be passed to the page component as props
  };
}

export default function Orders({ id }) {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    //const orderArray = [];

    const q = query(
      collection(firestore, "users", id, "orders"),
      orderBy("_created", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setOrders(cities);
    });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const router = useRouter();

  console.log(orders);
  if (!orders) {
    router.push("/");
  }

  return (
    <div>
      <div className="container mx-auto">
        <div>
          {orders.length > 0 ? (
            <div>
              {orders.map((e) => {
                return <OrderCard order={e} />;
              })}
              
            </div>
          ) : (
            <div className="text-center p-8"> No Order History </div>
          )}
        </div>
      </div>
    </div>
  );
}
