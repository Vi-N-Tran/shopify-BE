### ROOT_URL = http://localhost:9090/api/

# CRUD for User
# create user
### requirements
POST 
ROOT_URL/signup
body: {
  email: "test@test.com"
  password: "password"
  owner: "name"
}
### error states
Missing email, password, or owner name will result in a 422 error with "error": "Error: You must provide email, password and owner name" code

# read user
### requirements
GET 
ROOT_URL/user/:id
### error states
Wrong user Id will lead to an error statement

# update user
### requirements
PUT
ROOT_URL/user/:id
body: {
  email: "test@test.com"
  password: "password"
  owner: "name"
  picsLiked: ["id String of Pic Object", "id String of Pic Object"]
  picsOwn: ["id String of Pic Object", "id String of Pic Object"]
}
### error states
Wrong user Id will lead to an error statement
any other field can be left empty

# CRUD for User
# create pic
### requirements
POST 
ROOT_URL/pics
body: {
  image: String,
  title: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}
### error states
Any missing requirement in the body will default to an empty string.

# get a pic
### requirements
GET
ROOT_URL/pics/:id
### error states
Will return an error if id doesn't exist

# update a pic
### requirements
PUT
ROOT_URL/pics/:id
body: { 
  newOwnerId: '12345667'
}
### error states
Will return an error if id doesn't exist.

# delete a pic
### requirements
DELETE
ROOT_URL/pics/:id
### error states
Will return an error if id doesn't exist





