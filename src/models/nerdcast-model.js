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
    index: true,
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

schema.virtual('export').get(function () {
  return {
    id: this.id,
    url: this.url,
    published_at: this.published_at,
    pub_date: this.pub_date,
    modified_at: this.modified_at,
    duration: this.duration,
    title: this.title,
    slug: this.slug,
    episode: this.episode,
    product: this.product,
    product_name: this.product_name,
    product_email: this.product_email,
    friendly_post_type: this.friendly_post_type,
    friendly_post_type_slug: this.friendly_post_type_slug,
    friendly_post_time: this.friendly_post_time,
    subject: this.subject,
    image: this.image,
    image_alt: this.image_alt,
    audio_high: this.audio_high,
    audio_medium: this.audio_medium,
    audio_low: this.audio_low,
    audio_zip: this.audio_zip,
    insertions: this.insertions,
    ads: this.ads,
    description: this.description,
    'jump-to-time': this['jump-to-time'],
    guests: this.guests,
    'cacete-de-agulha': this['cacete-de-agulha'],
    'escalpo-solidario': this['escalpo-solidario'],
    'fan-arts': this['fan-arts'],
    editor: this.editor,
    comments: this.comments,
    post_type_class: this.post_type_class,
  }
})

module.exports = mongoose.model('nerdcast', schema)
