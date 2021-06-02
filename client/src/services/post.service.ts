import { ProfileServiceClient } from '../protobuff/ProfileServiceClientPb';
import { ProfileIdRequest } from '../protobuff/profile_pb';
const client = new ProfileServiceClient('0.0.0.0:10000', null, null)

const request = new ProfileIdRequest()
request.setId("hellosdjfkljsdlkf");

client.getById(request, {}, (err, response) => {
  if (err) {
    console.log(`Unexpected error for getById: code = ${err.code}` +
                `, message = "${err.message}"`);
  } else {
    console.log(response.toObject());
  }
});

class PostService {
  getAll() {
    return fetch('https://api.jonathanearl.localhost/posts')
      .then(res => res.json())
  }
}

export default new PostService();