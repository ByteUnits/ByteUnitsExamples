build:
	sam build --use-container
run:
	sam local start-api

deploy:
	$(info "Building project...")
	make build 

	$(info "Creating AWS S3 bucket...")
	aws s3 mb s3://samexamplebucket --region us-east-1

	$(info "Packaging up project...")
	sam package --s3-bucket samexamplebucket --output-template-file serverless-output.yaml
	
	$(info "Deploying to S3...")
	sam deploy --template-file serverless-output.yaml --stack-name samexamplestack--capabilities CAPABILITY_IAM		
	
	$(info "Deployment Completed")
