/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { status: 'ok' }
})

Route.get('/vehicles', 'VehiclesController.index')

// Todos routes
Route.get('/todos', 'TodosController.index')
Route.get('/todos/:id', 'TodosController.show')
Route.post('/todos', 'TodosController.store')
Route.put('/todos/:id', 'TodosController.update')
Route.delete('/todos/:id', 'TodosController.destroy')
Route.post('/todos/:id/favorite', 'TodosController.favorite')
Route.post('/todos/:id/unfavorite', 'TodosController.unfavorite')
Route.post('/todos/:id/color', 'TodosController.setColor')
