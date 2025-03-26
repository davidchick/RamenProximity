import { useContext, useEffect, useState } from "react";
import { User } from "./User";
import { collectionGroup, query, onSnapshot, orderBy } from "firebase/firestore";
import db from '../../db'


function RecentActivity() {

  const { user } = useContext(User);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const recentUsers = {};

  useEffect(() => {

    const getData = async () => {

      try {

        const q = query(collectionGroup(db, 'p2r-data'), orderBy("timestamp", "desc"));

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



  return (
    <>
      <h3>Recent Activity:</h3>

      {entries.map((entry, key) => {

        if (!recentUsers[entry.data().uid]) {

          recentUsers[entry.data().uid] = true;

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

        }

      })}
    </>
  )

}

export default RecentActivity;