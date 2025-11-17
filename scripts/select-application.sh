#!/bin/bash

# Application Selector Script
# This script helps you select and deploy applications via ArgoCD

echo "=========================================="
echo "GitOps Application Selector"
echo "=========================================="
echo ""

# Function to display available applications
show_applications() {
    echo "Available Applications:"
    echo "1. Voting App (Demo) - Docker Hub images"
    echo "2. Todo Management App - Custom application"
    echo "3. List all ArgoCD applications"
    echo "4. Exit"
    echo ""
}

# Function to deploy voting app
deploy_voting_app() {
    echo "Deploying Voting App..."
    
    # Create project if it doesn't exist
    argocd proj create voting-app \
        --description "Voting App Project - Demo app with Docker Hub images" \
        --src "https://github.com/sjlevalley/gitops-kubernetes" \
        --dest "https://kubernetes.default.svc,default" 2>/dev/null || echo "Project already exists"
    
    # Create application
    argocd app create voting-app \
        --repo https://github.com/sjlevalley/gitops-kubernetes \
        --path applications/voting-app \
        --dest-server https://kubernetes.default.svc \
        --dest-namespace default \
        --project voting-app \
        --sync-policy automated
    
    echo "Voting app deployed! Access at:"
    echo "- Vote App: http://34.229.127.234:30001"
    echo "- Result App: http://34.229.127.234:30002"
}

# Function to deploy todo app
deploy_todo_app() {
    echo "Select environment for Todo App:"
    echo "1. Development"
    echo "2. Staging"
    echo "3. Production"
    read -p "Enter choice (1-3): " env_choice
    
    case $env_choice in
        1) ENV="dev"; NAMESPACE="todo-app-dev" ;;
        2) ENV="staging"; NAMESPACE="todo-app-staging" ;;
        3) ENV="prod"; NAMESPACE="todo-app-prod" ;;
        *) echo "Invalid choice"; return 1 ;;
    esac
    
    echo "Deploying Todo App to $ENV environment..."
    
    # Create project if it doesn't exist
    argocd proj create gitops-application \
        --description "GitOps Application Project" \
        --src "https://github.com/sjlevalley/gitops-kubernetes" \
        --dest "https://kubernetes.default.svc,$NAMESPACE" 2>/dev/null || echo "Project already exists"
    
    # Create application
    argocd app create todo-app-$ENV \
        --repo https://github.com/sjlevalley/gitops-kubernetes \
        --path applications/todo-app/k8s/overlays/$ENV \
        --dest-server https://kubernetes.default.svc \
        --dest-namespace $NAMESPACE \
        --project gitops-application \
        --sync-policy automated
    
    echo "Todo app deployed to $ENV environment!"
}

# Function to list all applications
list_applications() {
    echo "Current ArgoCD Applications:"
    echo "============================="
    argocd app list
    echo ""
    echo "Application Details:"
    echo "==================="
    for app in $(argocd app list -o name | cut -d'/' -f2); do
        echo "--- $app ---"
        argocd app get $app --output wide
        echo ""
    done
}

# Main menu loop
while true; do
    show_applications
    read -p "Select an option (1-4): " choice
    
    case $choice in
        1)
            deploy_voting_app
            ;;
        2)
            deploy_todo_app
            ;;
        3)
            list_applications
            ;;
        4)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid option. Please try again."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    echo ""
done
