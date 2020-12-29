const express = require("express");
//const graphqlHTTP = require('express-graphql')
const { GraphQLServer } = require("graphql-yoga");
const { createGraphQlSchema } = require("openapi-to-graphql");
const oas = require("./openapi.json");

async function main(oas) {
  // generate schema:
  const { schema, report } = await createGraphQlSchema(oas);

  const server = new GraphQLServer({ schema });

  const options = {
    port: 80,
    endpoint: "/graphql",
    subscriptions: "/subscriptions",
    playground: "/",
  };

  server.start(options, ({ port, endpoint }) =>
    console.log(
      `Server started, listening on port ${port} for console and graphql is available at ${endpoint}.`
    )
  );
}

main(oas);
