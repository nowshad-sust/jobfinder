import { gql } from "apollo-boost";

const QUERY_JOBS = gql`
	query fetchJobs {
		jobs(limit: 20, offset: 10) {
			id
			title
			city
			company {
				id
				name
				company_investors {
					investor {
						id
						name
					}
				}
			}
		}
	}
`;

// list of cities
// query MyQuery {
//   jobs(distinct_on: city) {
//     city
//   }
// }

export { QUERY_JOBS };
