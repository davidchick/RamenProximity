import { useContext, useEffect, useState } from "react";
import { User } from "./User";
import { collection, getDoc, setDoc, query, doc, onSnapshot, deleteDoc, addDoc, orderBy, limit } from "firebase/firestore";
import db from '../../db'


function RecentActivity() {

  const { user, setUser } = useContext(User);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {

    const getData = async () => {

      try {

        const q = await query(collection(db, "users", user.uid, "p2r-data"), orderBy("timestamp", "desc"), limit(5));

        onSnapshot(q, (doc) => {
          setEntries(doc.docs)
        });

      } catch {
        setHasError(true);

      } finally {
        setIsLoading(false);

      }

    }

    if (user) {

      getData();

    }

    return () => onSnapshot;

  }, [user]);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (hasError) {
    return <h2>Error!!!</h2>
  }

  if (user) {

    return (
      <>
        <h3>Recent Activity:</h3>

        {entries.map((entry, key) => {

          return (
            <div className="recents" key={key}>
              <div className="line-item" >
                <img className="profile-image" src={entry.data().photoURL} alt={entry.data().displayName}></img>
              </div>
              <div className="line-item">
                <h3>{entry.data().p2r.toFixed(2)}</h3>
              </div>
              <div className="line-item">
                {entry.data().restaurant}<br />
                {entry.data().timestamp.toDate().toLocaleString()}
              </div>
            </div>
          )
        })}

      </>
    )

  } else {

    return (<></>)

  }

}

export default RecentActivity;