pipeline {
    agent any
    environment {
        PROJECT_ID = 'fleet-muse-329407'
        CLUSTER_NAME = 'cluster-1'
        LOCATION = 'us-central1-c'
        CREDENTIALS_ID = 'fleet-muse-329407-4cadc5b2b072.json'
        //REGISTRY= 'juileekaloti1/hello'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
           steps {
               script {
                   myapp = docker.build("fleet-muse-329407/hello:${env.BUILD_ID}")
               }
         }
       }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://gcr.io', "gcr:fleet-muse-329407") {
                           myapp.push("latest")
                           myapp.push("${env.BUILD_ID}")
                    }
               }
           }
        }        
        stage('Deploy App') {
      steps {
        script {
           
           sh "sed -i 's/hello:latest/hello:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            
          
            
            }
        }
    }    


        }
      }
    
