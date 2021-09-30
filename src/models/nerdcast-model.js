'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  id: {
    type: Number,
    index: true,
  },
  url: {
    type: String,
  },
  published_at: {
    type: Date,
    index: true,
  },
  pub_date: {
    type: Date,
    index: true,
  },
  modified_at: {
    type: Date,
    index: true,
  },
  duration: {
    type: Number,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  episode: {
    type: String,
    index: true,
  },
  product: {
    type: String,
    index: true,
  },
  product_name: {
    type: String,
  },
  product_email: {
    type: String,
  },
  friendly_post_type: {
    type: String,
  },
  friendly_post_type_slug: {
    type: String,
  },
  friendly_post_time: {
    type: String,
  },
  subject: {
    type: String,
    index: true,
  },
  image: {
    type: String,
  },
  image_alt: {
    type: String,
  },
  audio_high: {
    type: String,
  },
  audio_medium: {
    type: String,
  },
  audio_low: {
    type: String,
  },
  audio_zip: {
    type: String,
  },
  insertions: {
    type: Array,
  },
  ads: {
    type: Array,
  },
  description: {
    type: String,
  },
  'jump-to-time': {
    type: Object,
  },
  guests: {
    type: Array,
  },
  'cacete-de-agulha': {
    type: Array,
  },
  'escalpo-solidario': {
    type: Array,
  },
  'fan-arts': {
    type: Array,
  },
  editor: {
    type: Object,
  },
  comments: {
    type: String,
  },
  post_type_class: {
    type: String,
  },
})

module.exports = mongoose.model('nerdcast', schema)
