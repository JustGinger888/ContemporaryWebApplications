import { getUserByUid } from "../../lib/firebase";
import { useRouter } from 'next/router';



export async function getServerSideProps({ query }) {
    const id = query.id;
  
    const userDoc = await getUserByUid(id);
  
    // JSON serializable data
    let user = null;
  
    if (userDoc) {
        console.log(userDoc);
      user = userDoc;
    }
  
    return {
      props: { user }, // will be passed to the page component as props
    };
  }

export default function UserProfilePage({user}) {
    return (
        <div>
            {user.email}
        </div>
    );
}