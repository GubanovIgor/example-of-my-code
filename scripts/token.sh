#!/bin/bash

response=$(curl --location --write-out '\n%{http_code}\n' --request POST $URL \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode $CLIENT_ID \
--data-urlencode $SECRET \
--data-urlencode 'grant_type=password' \
--data-urlencode 'scope=openid profile offline_access api-read api-write' \
--data-urlencode $USERNAME \
--data-urlencode $PASSWORD \
--data-urlencode 'user-identity-type=2' --silent)

http_code=$(tail -n1 <<< "$response")  # get the last line
content=$(sed '$ d' <<< "$response")   # get all but the last line which contains the status code

if [ -z "$1" ]
  then
    graphql_url='https://'
else 
    graphql_url="$1" # can add a custom url when calling the script
fi

echo "HTTP CODE  $http_code"
if [ $http_code = 200 ]; then
    echo "OK Successfully retrieved token! graphql.config.json is updated"
    access_token=$(jq -r '.access_token' <<< "$content") 
    # echo "$access_token"
    jq -n --arg token $access_token --arg uri $graphql_url '{"projects":{"lib":{"extensions":{"endpoints":{"default":{"url":$uri,"headers":{"Authorization":"Bearer \($token)"}}}}}}}' > graphql.config.json
else
    echo "ERROR: failed to get token! http_code=$http_code"
    echo "$content"
fi