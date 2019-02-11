# hello_world_name/app.py
import json

def lambda_handler(event, context):
    try:
        name = event['pathParameters']['name']
    except Exception as e:
        print(e)
        raise(e)
    
    return {
        "statusCode": 200,
        "body": json.dumps(
            {"message": "Hi there " + str(name) + "!"}
        ),
    }