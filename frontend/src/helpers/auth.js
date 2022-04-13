import jwt from 'jwt-decode'

export const tokenIsExpired = (token, currentTime) => {
  const decodedToken = jwt(token);
  console.log('token time', decodedToken.exp)
  console.log('current time', currentTime)
  // if(decodedToken.exp < currentTime){
  //   console.log('true')
  //   return true
  // }else {
  //   console.log('false')

  //   return false
  // }
}