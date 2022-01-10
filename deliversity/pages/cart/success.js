import React, { useState, useEffect } from "react";

import { useShoppingCart } from "use-shopping-cart";

export async function getServerSideProps({ query }) {
  let id = query.session_id;

  const res = await fetch(
    `https://us-central1-deliversity-b5dc6.cloudfunctions.net/checkStatus?id=${id}`
  );
  const data = await res.json();

  if (!data) {
    // return {
    //   redirect: {
    //     destination: '/',
    //     permanent: false,
    //   },
    // }
  }

  return {
    props: { id, data }, // will be passed to the page component as props
  };
}

export default function Success({ id, data }) {
  const { clearCart,  } = useShoppingCart();
  
  useEffect(
    () => {
        if ((data.result == "complete")) {
            console.log('clear');
            clearCart();
          }
      }, []
  )
  

  return <div>{data.result}</div>;
}
