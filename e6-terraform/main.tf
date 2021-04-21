terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = true
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.latest
  name  = "TypeScript_Teatime_Gateway"
  ports {
    internal = 80
    external = 8080 # localhost:8080 -> container 80 -> nginx webserver
  }
}

resource "docker_image" "mongo" {
  name         = "mongo:latest"
  keep_locally = true
}

resource "docker_container" "mongo" {
  image = docker_image.mongo.latest
  name  = "TypeScript_Teatime_Database"
  ports {
    internal = 27017
    external = 27017
  }
}

resource "aws_instance" "typescript_teatime" {
  # amazon machine instance (essentially like docker image)
  ami           = "ami-830c94e3" # ubuntu (12?)
  instance_type = "t2.micro"

  tags = {
    Name = "TypeScriptTeatimeIsAwesome"
  }
}

module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "1.25.0"
  bucket  = "typescript-tea-cup"
  acl     = "public-read"
}
