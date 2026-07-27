fetch('https://indexer.preprod.midnight.network/api/v4/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: '{ transaction(id: "00b34df363e226a23401009042401c9ffeac7726b3435b764d6cfe277d0edb219c") { id } }'
  })
}).then(r => r.json()).then(console.log);
