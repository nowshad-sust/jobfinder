import { gql } from "apollo-boost";

const QUERY_FILTERS = gql`
	query fetchFilterData {
		companies(distinct_on: id) {
			name
			id
		}
		investors(distinct_on: id) {
			name
			id
		}
		cities: jobs(distinct_on: city) {
			city
		}
	}
`;

export { QUERY_FILTERS };
