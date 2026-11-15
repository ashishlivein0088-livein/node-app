pipeline {
    agent any
    
    environment {
        AWS_ACCOUNT_ID = '666861118494'
        AWS_REGION = 'us-east-1'
        ECR_REPO_NAME = 'my-node-app'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Install Dependencies & Test') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build("${ECR_REPO_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {
                script {
                    // Authenticate Docker with ECR and push
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                    sh "docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Trigger Deploy Job') {
            steps {
                build job: 'deploy-node-app',
                  wait: true,
                  propagate: true,
                  parameters: [
                    string(name: 'IMAGE_TAG', value: "${IMAGE_TAG}"),
                    string(name: 'ECR_REPO',  value: "${ECR_REPO_NAME}")
                  ]
            }
        }
    }
}
