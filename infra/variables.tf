variable "context" {
  type        = any
  default     = {}
  description = "Overwrite the context, otherwise the variables will be taken from envvars of the stack."
}

variable "function_version" {
  type        = string
  default     = null
  description = "The version of the function to deploy"
}

variable "instance_name" {
  type        = string
  default     = null
  description = "The specific name of this instance of the function"
}
