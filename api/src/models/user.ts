interface UserRequest {
    userName: string,
    privateKey: String,
    name: {
      firstName: string,
      lastName: string
    }
}

export default UserRequest;