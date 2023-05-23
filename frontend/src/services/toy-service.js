// import axios from 'axios'
import { utilService } from './util-service'
import { httpService } from './http-service'
// import { storageService } from './async-storage-service'

const KEY = 'toys_db'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]
const ENDPOINT = 'toy'
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/toy' : '//localhost:3030/api/toy/'

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getlabels,
}

const gToys = _createToys()

async function query(filterBy = {}) {
  return await httpService.get(ENDPOINT, filterBy)
  // return axios.get(BASE_URL, { params: { filterBy } }).then((res) => res.data)
  // return storageService.query(KEY)
}

async function getById(id) {
  return await httpService.get(`${ENDPOINT}/${id}`)
  // return axios.get(BASE_URL + id).then((res) => res.data)
  // return storageService.getById(KEY, id)
}

async function remove(id) {
  return await httpService.delete(`${ENDPOINT}/${id}`)
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  // return storageService.remove(KEY, id)
}

async function save(toy) {
  return toy._id
    ? await httpService.put(`${ENDPOINT}/${toy._id}`, toy)
    : await httpService.post(ENDPOINT, toy)
  // return toy._id ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
}

function getEmptyToy() {
  return Promise.resolve({
    name: '',
    price: 0,
    labels: [],
    createdAt: new Date(),
    inStock: true,
    imgUrl:null
  })
}

function getlabels() {
  return labels
}

function _createToys() {
  let toys = utilService.loadFromStorage(KEY)
  if (!toys || !toys.length) {
    toys = [
      _createToy('Doll', 150, ['On wheels', 'Doll']),
      _createToy('Truck', 80, ['Outdoor', 'Baby']),
      _createToy('Cards', 150, ['Puzzle', 'Art']),
    ]
    utilService.saveToStorage(KEY, toys)
    // 'On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'
  }
  return toys
}

function _createToy(name, price, labels, reviews) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    inStock: true,
    createdAt: new Date(),
    reviews: [
      {
        _id: utilService.makeId(),
        txt: utilService.getLoremIpsum(5),
        createdAt: new Date(),
      },
      {
        _id: utilService.makeId(),
        txt: utilService.getLoremIpsum(5),
        createdAt: new Date(),
      },
      {
        _id: utilService.makeId(),
        txt: utilService.getLoremIpsum(5),
        createdAt: new Date(),
      },
    ],
  }
}
