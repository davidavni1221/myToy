const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy)
    const sortCriteria = _buildSortCriteria(filterBy)

    // const criteria = {}

    const collection = await dbService.getCollection('toy')
    var toys = await collection.find(criteria).sort(sortCriteria).toArray()
    return toys
  } catch (err) {
    logger.error('cannot find toys', err)
    throw err
  }
}

async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toy')
    const toy = collection.findOne({ _id: ObjectId(toyId) })
    return toy
  } catch (err) {
    logger.error(`while finding toy ${toyId}`, err)
    throw err
  }
}

async function remove(toyId) {
  try {
    const collection = await dbService.getCollection('toy')
    await collection.deleteOne({ _id: ObjectId(toyId) })
    return toyId
  } catch (err) {
    logger.error(`cannot remove toy ${toyId}`, err)
    throw err
  }
}

async function add(toy) {
  try {
    const collection = await dbService.getCollection('toy')
    const addedToy = await collection.insertOne(toy)
    return addedToy
  } catch (err) {
    logger.error('cannot insert toy', err)
    throw err
  }
}

async function update(toy) {
  try {
    var id = ObjectId(toy._id)
    delete toy._id
    const collection = await dbService.getCollection('toy')
    await collection.updateOne({ _id: id }, { $set: { ...toy } })
    return toy
  } catch (err) {
    logger.error(`cannot update toy ${toy._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  // by name
  const regex = new RegExp(filterBy.name, 'i')
  criteria.name = { $regex: regex }

  // filter by inStock
  if (filterBy.inStock) {
    criteria.inStock = { $eq: JSON.parse(filterBy.inStock) }
  }

  // filter by labels
  if (filterBy.labels?.length) {
    criteria.labels = { $in: filterBy.labels }
  }

  return criteria
}

function _buildSortCriteria({ sortBy = '' }) {
  // let sort = sortBy.split(' - ')
  let criteria = {}
  switch (sortBy) {
    case 'time':
      // criteria.name = sort[1] === 'Increasing' ? 1 : -1
      criteria.createdAt = 1
      break
    case 'name':
      criteria.name =  1
      // criteria.price = sort[1] === 'Increasing' ? 1 : -1
      break
    case 'price':
      // criteria.createdAt = sort[1] === 'Increasing' ? 1 : -1
      criteria.price =  -1
      break
  }
  return criteria
}
