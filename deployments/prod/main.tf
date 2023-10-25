module "lambda_app" {
  source = "../../infra"

  function_version = substr(var.spacelift_commit_sha, 0, 7)
}

