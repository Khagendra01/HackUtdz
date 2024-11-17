resource "aws_s3_bucket" "hackutdz-financi" {
  bucket = "hackutdz-financi123"

  tags = {
    Name        = "New bucket"
    Environment = "Dev"
  }
}