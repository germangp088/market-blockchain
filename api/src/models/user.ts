interface UserRequest {
    userName: string,
    name: {
      firstName: string,
      lastName: string
    }
}

export default UserRequest;