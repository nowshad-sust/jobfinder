import { gql } from "apollo-boost";

const QUERY_COMPANIES = gql`
  query fetch_companies {
    companies {
      id
      name
      no_of_employees
    }
  }
`;

export { QUERY_COMPANIES };
