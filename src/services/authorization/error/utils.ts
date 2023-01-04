/**
 * Determines whether the payload contains LambdaException
 * class name
 * @param payload
 */
export default function isLambdaError(payload:any) {
  return payload.name == "LambdaException"
}