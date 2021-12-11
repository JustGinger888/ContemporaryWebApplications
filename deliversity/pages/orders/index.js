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

  //const orderSnap = await getUserOrders(id);

  // JSON serializable data
  // let orders = null;

  // if (userDoc) {
  //   console.log(userDoc);
  //   orders = userDoc;
  // }

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
      orderBy("_created")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setOrders([...orders, orders.push(doc.data())]);
      });
      
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
          {orders.map((e) => {
            return <OrderCard  order={e} />;
          })}
        </div>
      </div>
    </div>
  );
}
