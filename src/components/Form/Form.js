import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

import dbJSON from "../../asyncmock/db.json";
import { firestoreDb } from "../../services/firebase/index";

const Form = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(null);

  const initialValues = {
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    date: new Date(),
  };

  const [user, setUser] = useState(initialValues);
  const handleValues = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(firestoreDb, "user"), {
        ...user,
      });
      alert("los datos han sido cargados correctamente");
      navigate("/registered");
    } catch (err) {
      console.log(err);
    }
    setUser({ ...initialValues });
  };

  useEffect(() => {
    setInputs(dbJSON);
  }, []);
  const { items } = inputs ?? {};

  return (
    <div className="container">
      <div>
        <h1
          style={{ color: "white", marginTop: "100px", marginBottom: "100px" }}
        >
          greydive.
        </h1>
      </div>
      <div>
        <h3 style={{ color: "white" }}>Formulario de Registro</h3>
        <form
          className="form"
          style={{ marginTop: "50px" }}
          onSubmit={handleSubmit}
        >
          {items
            ? items.map((input, i) => (
                <div className="mb-3" key={i}>
                  {input.options ? (
                    <div
                      className="card p-2"
                      style={{
                        backgroundColor: "#922295",
                        marginBottom: "100px",
                      }}
                    >
                      <label className="mb-3" style={{ color: "white" }}>
                        {input.label}
                      </label>
                      <select
                        className="form-select"
                        name={input.name}
                        required={input.required}
                        onChange={handleValues}
                      >
                        <option value="">Seleccione un país</option>
                        {input.options.map((option, i) => (
                          <option key={i} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div
                      className={
                        input.type === "checkbox" ? "form-check" : "card p-2"
                      }
                      style={
                        input.type === "checkbox"
                          ? { marginBottom: "100px" }
                          : {
                              backgroundColor: "#922295",
                              marginBottom: "100px",
                            }
                      }
                    >
                      {input.label === "Enviar" ? null : (
                        <label
                          className={
                            input.type === "checkbox"
                              ? "form-check-label"
                              : "form-label"
                          }
                          style={{ color: "white" }}
                        >
                          {input.label}
                        </label>
                      )}
                      <input
                        className={
                          input.type === "checkbox"
                            ? "form-check-input"
                            : "form-control"
                        }
                        style={
                          input.type === "submit"
                            ? {
                                backgroundImage:
                                  "linear-gradient(to right, #d30350, #692a90)",
                                color: "white",
                              }
                            : null
                        }
                        type={input.type}
                        name={input.name}
                        label={input.label}
                        required={input.required}
                        onChange={handleValues}
                      />
                    </div>
                  )}
                </div>
              ))
            : null}
        </form>
      </div>
    </div>
  );
};

export default Form;
