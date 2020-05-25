import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_COMPANIES } from "../queries/Company";

const Companies = (props) => {
  const { loading, error, data } = useQuery(QUERY_COMPANIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log("data", data);

  return data.companies.map(({ id, name }) => (
    <div key={id}>
      <p>{name}</p>
    </div>
  ));
};

Companies.propTypes = {};

export default Companies;
