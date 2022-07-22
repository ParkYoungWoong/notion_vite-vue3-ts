<template>
  <h1>Hello world</h1>
<!--
  <div
    v-for="key in getKeys(data)"
    :key="key">
    {{ key }}
  </div>
  <div
    v-for="(value, index) in getValues(data)"
    :key="index">
    {{ value }}
  </div>
-->
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getKeys(data) {
      return Object.keys(data)
    },
    getValues(data) {
      return Object.values(data)
    }
  }
}
</script>
