import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";
import { firestoreDb } from "../../services/firebase";

const Registered = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getDocs(
      query(collection(firestoreDb, "user"), orderBy("date", "desc"), limit(1))
    )
      .then((res) => {
        const userFilter = res.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setUser(userFilter);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="card text-center container p-5"
      style={{
        width: "30rem",
        backgroundImage: "linear-gradient(to right, #d30350, #692a90)",
        color: "white",
        marginTop: "40vh",
      }}
    >
      <h2>Sus datos de registro son:</h2>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        user.map((user) => (
          <div className="card-body" key={user.id}>
            <p className="card-title">Nombre completo: {user.full_name}</p>
            <p className="card-title">Correo electrónico: {user.email}</p>
            <p className="card-title">Fecha de nacimiento: {user.birth_date}</p>
            <p className="card-title">
              País de origen: {user.country_of_origin}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Registered;
