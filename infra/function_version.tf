data "git_repository" "this" {
  count = var.function_version != null ? 0 : 1
  path  = "${path.module}/.."
}

locals {
  function_version = var.function_version != null ? var.function_version : substr(data.git_repository.this[0].commit_sha, 0, 7)
}
