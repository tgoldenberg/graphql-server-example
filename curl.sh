# This returns the first 5 users
curl -XPOST -H "Content-Type: application/json" -d '{"query": "{users { email } }" }' http://localhost:8080/graphql
