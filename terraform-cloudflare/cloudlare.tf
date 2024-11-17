# Configure the Cloudflare provider using the required_providers stanza
# required with Terraform 0.13 and beyond. You may optionally use version
# directive to prevent breaking changes occurring unannounced.
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = "iTPRtg5sPN_sKPepyKYKjfo6DCqdqrY93NFtCuCN"
}

variable "zone_id" {
  default = "0da42c8d2132a9ddaf714f9e7c920711"
}

variable "domain" {
default = "moneymentor.tech/"
}

resource "cloudflare_record" "www" {
zone_id = var.zone_id
name = "Www"
value = "203.0.113.10"
type = "A"
proxied = true
}