import { gql } from "apollo-boost";

const QUERY_JOBS = gql`
	query fetchJobs(
		$offset: Int
		$limit: Int
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
			limit: $limit
			offset: $offset
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

export { QUERY_JOBS };
