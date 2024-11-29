provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "patients" {
  name           = "Patients"
  hash_key       = "patientId"
  read_capacity  = 5
  write_capacity = 5

  attribute {
    name = "patientId"
    type = "S"
  }
}
