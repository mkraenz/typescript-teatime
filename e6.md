# TypeScript TeaTime Episode 6

## Topics Vote

- automatic reviews
- VS Code Plugin -> Twitch Code Highlight
- Machine learning ml5.js
- Kubernetes (service orchestration - many docker containers)
- Terraform (cloud provision -> create AWS S3 buckets, EC2, Lambda, Kubernetes)

**Voted:** Terraform

## Terraform

- [x] AWS EC2
- [x] local Docker nginx
- [x] check resilience against errors
- [x] AWS S3 bucket

### Components of Terraform

1. configurations files written by us
2. State (maintained by Terraform)
3. Terraform Core
4. Provider - AWS Provider, Docker provider, Minikube provider, etc

### Commands

```bash
terraform fmt # format config files
terraform init # initialize plugins etc
terraform validate # validate config
terraform refresh # update state with what's actually running in the real world
terraform plan # plan ahead to the desired infrastructure (as defined by configs)
terraform apply # execute the plan in the real world
terraform destroy # remove everything defined in configs + state
```

## Links

- <https://terraform.io>
- <https://learn.hashicorp.com/collections/terraform/aws-get-started>
- <https://parkmycloud.com/blog/aws-vs-azure-vs-google-cloud-market-share>
- <https://registry.terraform.io/browse/providers>
- <https://aws.amazon.com/de/free?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc>
- <https://aws.amazon.com/free>
- <https://terraform.io/docs/cloud/index.html>
- <https://terraform.io/docs/language/settings/backends/index.html>
- <https://imgflip.com/i/56lbxm>
- <https://cloudrumblings.io/cloud-farm-pets-cattle-unicorns-and-horses-85271d915260>
- <https://registry.terraform.io/modules/terraform-aws-modules/s3-bucket/aws/latest>
- <https://registry.terraform.io/modules/terraform-aws-modules/s3-bucket/aws/latest?tab=dependencies>
- <https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket>
- <https://github.com/proSingularity/tea-and-typescript-random-walk>
