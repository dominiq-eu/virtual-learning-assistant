#! /usr/bin/env bash

key=$1
secret="$2"
if [ -z "$key" -o -z "$secret" ]; then
    echo "Usage: `basename $0` <key> <secret>"
    exit
fi

echo "Key: ${key}"
echo "Secret: ${secret}"
echo "Response:"

curl --user "$key:$secret" \
    --data "oauth_consumer_key=$key" \
    --data "oauth_consumer_secret=$secret" \
    --data "oauth_version=1.0" \
    --data "oauth_timestamp=$(date "+%s")" \
    --data "lti_message_type=basic-lti-launch-request" \
    --data "lti_version=LTI-1p0" \
    --data "resource_link_id=res-linkid-d" \
    localhost:3000



