A database of movie films (with reviews) and the studios 
that made them.

### Models

* Studio
* Film (belongs to a studio id)

#### Studio

```
{
  name: <name-of-studio R>,
  address: {
    city: city
    state: state
    country: country
  }
}
```

#### Film

```
{
  title: <name-of-film R>,
  studio: <studio-id R>,
  released: <year R>
}

### Routes

#### GET

route | returns
---|---
`GET /studios` | [ { name } ]
`GET /studios/:id` | { name, address, films: [{ title }] }
`GET /films` | [{ title, studio.name }]
`GET /films/:id` | { title, studio.name }

#### POST/PATCH

Studios and Films can be added or updated.

#### DELETE

Studios and Films can be deleted. However, studios cannot be deleted if there are films.

## Testing

* E2E/API tests using Mocha and Chai.
