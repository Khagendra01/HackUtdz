terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}


resource "aws_s3_bucket_website_configuration" "react-confg" {
    bucket = aws_s3_bucket.hackutdz-financi.id

    index_document {
      suffix = "index.html"

    }
    
}

resource "aws_s3_bucket_ownership_controls" "bucket-ownership" {
  bucket = aws_s3_bucket. hackutdz-financi.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket-public-access" {
  bucket = aws_s3_bucket. hackutdz-financi.id

  block_public_acls = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false

}

resource "aws_s3_bucket_acl" "bucket-acl" {
bucket = aws_s3_bucket. hackutdz-financi.id
acl = "public-read"

depends_on = [aws_s3_bucket_ownership_controls.bucket-ownership,
aws_s3_bucket_public_access_block. bucket-public-access]

}