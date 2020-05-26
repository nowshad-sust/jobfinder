import { gql } from "apollo-boost";

const QUERY_JOBS = gql`
	query fetchJobs(
		$keyword: String!
		$cities: [String!]
		$companies: [String!]
		$investors: [Int!]
	) {
		jobs(
			where: {
				title: { _ilike: $keyword }
				city: { _in: $cities }
				company: {
					name: { _in: $companies }
					company_investors: { investor_id: { _in: $investors } }
				}
			}
			limit: 30
			offset: 10
			distinct_on: id
		) {
			city
			id
			title
			company {
				name
				id
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
