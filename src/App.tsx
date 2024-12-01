import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import schema from "./schema.json";
import uiSchema from "./uiSchema.json";

const App: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    countries: [{ country: "Inconnu", percentage: 0 }],
  });

  const [error, setError] = useState<string | null>(null);

  // Fonction pour valider la somme des pourcentages
  const validateSum = (countries: any) => {
    const totalPercentage = countries.reduce(
      (sum: number, item: any) => sum + item.percentage,
      0
    );

    if (totalPercentage !== 100) {
      setError("La somme des pourcentages doit être égale à 100%");
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    validateSum(data.countries);
  }, [data.countries]);

  const handleChange = (newData: any) => {
    setData(newData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Formulaire JSONForms</h1>
      <JsonForms
        schema={schema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={({ data }) => handleChange(data)}
      />

      {/* Affichage de l'erreur pour la somme des pourcentages */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <h2>Données JSON :</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
