module "lambda_function" {
  source  = "spacelift.io/trainline-private/lambda-function/default"
  version = "~> 2.0"

  context = var.context

  instance_name    = var.instance_name
  function_version = local.function_version

  handler = "index.handler"
  runtime = "nodejs18.x"

  reserved_concurrent_executions = -1
}
