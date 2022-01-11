import React, { useState, useEffect } from "react";
import { updateUserCart} from "../../lib/firebase";

import { useShoppingCart } from "use-shopping-cart";

export async function getServerSideProps({ query }) {
  let session = query.session_id;
  let uid = query.id;

  const res = await fetch(
    `https://us-central1-deliversity-b5dc6.cloudfunctions.net/checkStatus?id=${session}`
  );
  const data = await res.json();

  
  if ((data.result == "complete")) {
    const userDoc = await updateUserCart(session, uid);
  }

  return {
    props: { session, data, }, // will be passed to the page component as props
  };
}

export default function Success({ session, data,  }) {
  const { clearCart,  } = useShoppingCart();
  
  useEffect(
    async () => {
        if ((data.result == "complete")) {
          
            console.log('clear');
            clearCart();
          }
      }, []
  )
  

  return <div>{data.result == 'complete' ? 
(<> <div className="text-center p-8"> Completed Successfully </div> </>):(<> <div className="text-center p-8"> Payment Failed </div> </>)
}</div>;
}
