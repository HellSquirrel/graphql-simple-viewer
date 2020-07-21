import React, { useState, useCallback, useMemo } from "react";
import "graphiql/graphiql.css";
import GraphiQL from "graphiql";
import { addMocksToSchema } from "@graphql-tools/mock";
import FileLoader from "./FileLoader";
const { graphql, buildClientSchema } = require("graphql");

const App = () => {
  const [dataString, setDataString] = useState(null);
  const schema = useMemo(() => {
    if (!dataString) return null;
    const data = JSON.parse(dataString).data;
    return addMocksToSchema({
      schema: buildClientSchema(data),
    });
  }, [dataString]);
  const fetcher = useCallback(
    (params) => {
      if (!schema) return Promise.reject({ data: "invalid schema" });
      return graphql(schema, params.query).then((data) => {
        return data;
      });
    },
    [schema]
  );

  return (
    <React.Fragment>
      <FileLoader
        onChange={(file) => {
          setDataString(file);
        }}
      />
      {!!dataString && <GraphiQL fetcher={fetcher} />}
    </React.Fragment>
  );
};

export default App;
