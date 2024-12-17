#!/bin/bash

# Define the API key and URL
CRM_API_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJkN2Y1MTFiYi0zOTg2LTU3NmMtODRkYy02NzYwMmQ4Mzk5M2QiLCJqdGkiOiI0ZjBkMjVjNTMyYjUxMWI3NDQ1NzUxNTQ5ZWMxOGJiMTczNzc0N2ZhYmQ4MjZlODAxNWQwNDhlZmRlNzI4MTlmYjU3Y2M1OWJhZjgyNDdmMyIsImlhdCI6MTczNDQ0OTc3Mi4xMDk1NCwibmJmIjoxNzM0NDQ5NzcyLjEwOTU0MSwiZXhwIjoxNzM0NDUzMzcyLjEwMDQyMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.R5EFQR2o2eZQJOANxuwe7ejylFRBTIGVCUbUavI6Of3X0sm6hRlu2u1lJp0fmn0ziVnyICL622gXie7jbE_JxvvPpIGRYc8DrJ8EhbZzQ8GfIm2UfLvMhpd6HSH7FJ08qTDov5_my4hxDPDyjc2QNDbKBgBztGcf8m5MITNovZcBzzIzP_5luNthWwEo00ljDuZmlMl3cNfdIFNzeTUSpmqYxr83xJMjlSWKzhmJGfTeJFFzKtnWi46RHOncCP66oLOOJWbIPHJWDRkZJnXg1lBkif4RtrHxpm7sc2qm-tWEixRAPov_DxSM44bImKrwWCfgo9spRMYII6FWT7_BSA"
CRM_URL="http://localhost:8000/legacy/Api/V8/module"

# List of user names to create
user_names=(
    "Chou Tzuyu"
    "Lee Dahyun"
    "Nadine Lee"
    "Go Min Si"
    "Yoon Bora"
    "Son Chaeyoung"
    "Carlo Juab"
    "Xander Labide"
    "Ean Velayo"
    "Spongebob Squarepants"
)

# Loop through each name and create a user
for name in "${user_names[@]}"; do
    # Create JSON request body
    json_body=$(jq -n --arg name "$name" '{
        data: {
            type: "Accounts",
            attributes: {
                name: $name
            }
        }
    }')

        # Make the POST request using curl
    response=$(curl -s -X POST "$CRM_URL" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $CRM_API_KEY" \
        -d "$json_body")


    # Print the response for each user creation
    echo "Response for $name: $response"
done
